import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Initialize Supabase client
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database interface functions
export const getSchedules = async () => {
  const { data, error } = await supabase
    .from('schedules')
    .select(`
      *,
      train:trains(*),
      sourceStation:stations!schedules_source_station_id_fkey(*),
      destinationStation:stations!schedules_destination_station_id_fkey(*)
    `);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

export const getStations = async () => {
  const { data, error } = await supabase
    .from('stations')
    .select(`
      *,
      lines:station_lines(
        lines(*)
      )
    `);
  
  if (error) {
    throw new Error(error.message);
  }
  
  // Format the data to match our type structure
  return data.map(station => ({
    ...station,
    lines: station.lines.map(item => item.lines),
  }));
};

export const getRoutes = async (fromStationId: string, toStationId: string) => {
  const { data, error } = await supabase
    .from('routes')
    .select(`
      *,
      sourceStation:stations!routes_source_station_id_fkey(*),
      destinationStation:stations!routes_destination_station_id_fkey(*),
      segments:route_segments(
        *,
        line:lines(*),
        fromStation:stations!route_segments_from_station_id_fkey(*),
        toStation:stations!route_segments_to_station_id_fkey(*)
      )
    `)
    .eq('source_station_id', fromStationId)
    .eq('destination_station_id', toStationId);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

export const getAlerts = async () => {
  const { data, error } = await supabase
    .from('alerts')
    .select(`
      *,
      affectedLines:alert_lines(
        lines(*)
      )
    `);
  
  if (error) {
    throw new Error(error.message);
  }
  
  // Format the data to match our type structure
  return data.map(alert => ({
    ...alert,
    affectedLines: alert.affectedLines.map(item => item.lines),
  }));
};

export const updateUserPreferences = async (userId: string, preferences: any) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      ...preferences
    });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

export const toggleFavoriteStation = async (userId: string, stationId: string) => {
  // First, get current favorite stations
  const { data: userData, error: userError } = await supabase
    .from('user_preferences')
    .select('favorite_stations')
    .eq('user_id', userId)
    .single();
  
  if (userError && userError.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(userError.message);
  }
  
  let favoriteStations = userData?.favorite_stations || [];
  
  // Toggle the station
  if (favoriteStations.includes(stationId)) {
    favoriteStations = favoriteStations.filter(id => id !== stationId);
  } else {
    favoriteStations.push(stationId);
  }
  
  // Update preferences
  const { error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      favorite_stations: favoriteStations
    });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return favoriteStations;
};