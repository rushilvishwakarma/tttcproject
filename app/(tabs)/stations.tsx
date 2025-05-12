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
import { SearchBar } from '@/components/common/SearchBar';
import { StationCard } from '@/components/stations/StationCard';
import { useStations } from '@/hooks/useStations';
import { Station } from '@/types';
import { LineFilter } from '@/components/stations/LineFilter';

export default function StationsScreen() {
  const { colors } = useTheme();
  const { stations, loading, error, refreshStations, toggleFavorite } = useStations();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshStations();
    setRefreshing(false);
  }, [refreshStations]);

  const filteredStations = stations.filter((station: Station) => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLine = !selectedLine || station.lines.some(line => line.id === selectedLine);
    return matchesSearch && matchesLine;
  });

  // Get unique lines from all stations for line filter
  const lines = [...new Set(stations.flatMap(station => station.lines))];

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
          onPress={refreshStations}
        >
          <Text style={[styles.retryButtonText, { color: colors.white }]}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.searchContainer}>
        <SearchBar 
          placeholder="Search stations" 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
      </View>
      
      <LineFilter 
        lines={lines} 
        selectedLine={selectedLine} 
        onSelectLine={setSelectedLine} 
      />
      
      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StationCard 
            station={item} 
            onToggleFavorite={() => toggleFavorite(item.id)} 
          />
        )}
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
              No stations found
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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