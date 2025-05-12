import { useState, useCallback } from 'react';
import { getRoutes } from '@/services/supabase';
import { Route } from '@/types';
import { mockRoutes } from '@/data/mockData';

export const useRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findRoutes = useCallback(async (fromStationId: string, toStationId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would fetch from Supabase
      // const data = await getRoutes(fromStationId, toStationId);
      
      // Using mock data for demonstration
      // Simulate a delay for loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock routes to match the source and destination
      const data = mockRoutes.filter(
        route => route.sourceStation.id === fromStationId && 
                route.destinationStation.id === toStationId
      );
      
      setRoutes(data);
    } catch (err) {
      setError('Failed to find routes. Please try again.');
      console.error('Error finding routes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    routes,
    loading,
    error,
    findRoutes,
  };
};