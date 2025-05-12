import { useState, useEffect, useCallback } from 'react';
import { getAlerts } from '@/services/supabase';
import { Alert } from '@/types';
import { mockAlerts } from '@/data/mockData';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would fetch from Supabase
      // const data = await getAlerts();
      
      // Using mock data for demonstration
      const data = mockAlerts;
      
      setAlerts(data);
    } catch (err) {
      setError('Failed to load alerts. Please try again.');
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAlerts = useCallback(async () => {
    await fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    loading,
    error,
    refreshAlerts,
  };
};