import { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAlerts } from '@/hooks/useAlerts';
import { AlertCard } from '@/components/alerts/AlertCard';
import { LineFilter } from '@/components/stations/LineFilter';
import { Alert } from '@/types';

export default function AlertsScreen() {
  const { colors } = useTheme();
  const { alerts, loading, error, refreshAlerts } = useAlerts();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshAlerts();
    setRefreshing(false);
  }, [refreshAlerts]);

  const filteredAlerts = selectedLine 
    ? alerts.filter((alert: Alert) => alert.affectedLines.some(line => line.id === selectedLine))
    : alerts;

  // Get unique lines from all alerts for line filter
  const lines = [...new Set(alerts.flatMap(alert => alert.affectedLines))];

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: colors.primary }]} 
          onPress={refreshAlerts}
        >
          <Text style={[styles.retryButtonText, { color: colors.white }]}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[styles.headerText, { color: colors.text.primary }]}>
        Current Service Disruptions
      </Text>
      
      <LineFilter 
        lines={lines} 
        selectedLine={selectedLine} 
        onSelectLine={setSelectedLine} 
      />
      
      <FlatList
        data={filteredAlerts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AlertCard alert={item} />}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
              {selectedLine 
                ? "No service alerts for the selected line" 
                : "No service alerts at this time"}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    margin: 16,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});