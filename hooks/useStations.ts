import { useState, useEffect, useCallback } from 'react';
import { getStations, toggleFavoriteStation } from '@/services/supabase';
import { Station } from '@/types';
import { mockStations } from '@/data/mockData';

export const useStations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would fetch from Supabase
      // const data = await getStations();
      
      // Using mock data for demonstration
      const data = mockStations;
      
      setStations(data);
    } catch (err) {
      setError('Failed to load stations. Please try again.');
      console.error('Error fetching stations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshStations = useCallback(async () => {
    await fetchStations();
  }, [fetchStations]);

  const toggleFavorite = useCallback(async (stationId: string) => {
    try {
      // In a real app, this would update the database
      // const favoriteStations = await toggleFavoriteStation('current-user-id', stationId);
      
      // For demo, just update the local state
      setStations(prevStations => 
        prevStations.map(station => 
          station.id === stationId 
            ? { ...station, isFavorite: !station.isFavorite }
            : station
        )
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  }, []);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return {
    stations,
    loading,
    error,
    refreshStations,
    toggleFavorite,
  };
};