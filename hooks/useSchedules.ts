import { useState, useEffect, useCallback } from 'react';
import { getSchedules } from '@/services/supabase';
import { Schedule } from '@/types';
import { mockSchedules } from '@/data/mockData';

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would fetch from Supabase
      // const data = await getSchedules();
      
      // Using mock data for demonstration
      const data = mockSchedules;
      
      setSchedules(data);
    } catch (err) {
      setError('Failed to load schedules. Please try again.');
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSchedules = useCallback(async () => {
    await fetchSchedules();
  }, [fetchSchedules]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  return {
    schedules,
    loading,
    error,
    refreshSchedules,
  };
};