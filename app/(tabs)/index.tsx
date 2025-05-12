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
import { FilterButton } from '@/components/common/FilterButton';
import { ScheduleCard } from '@/components/schedules/ScheduleCard';
import { useSchedules } from '@/hooks/useSchedules';
import { FilterModal } from '@/components/schedules/FilterModal';
import { Schedule } from '@/types';

export default function ScheduleScreen() {
  const { colors } = useTheme();
  const { schedules, loading, error, refreshSchedules } = useSchedules();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    sourceStation: '',
    destinationStation: '',
    trainType: '',
    sortBy: 'departureTime',
    sortOrder: 'asc'
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshSchedules();
    setRefreshing(false);
  }, [refreshSchedules]);

  const filteredSchedules = schedules.filter((schedule: Schedule) => {
    const matchesSearch = 
      schedule.sourceStation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.destinationStation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.train.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSourceFilter = !filters.sourceStation || 
      schedule.sourceStation.name.toLowerCase().includes(filters.sourceStation.toLowerCase());
    
    const matchesDestFilter = !filters.destinationStation || 
      schedule.destinationStation.name.toLowerCase().includes(filters.destinationStation.toLowerCase());
    
    const matchesTrainType = !filters.trainType || 
      schedule.train.type.toLowerCase() === filters.trainType.toLowerCase();
    
    return matchesSearch && matchesSourceFilter && matchesDestFilter && matchesTrainType;
  });

  // Sort schedules based on filters
  const sortedSchedules = [...filteredSchedules].sort((a: Schedule, b: Schedule) => {
    if (filters.sortBy === 'departureTime') {
      return filters.sortOrder === 'asc' 
        ? new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
        : new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime();
    } else {
      return filters.sortOrder === 'asc' 
        ? new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime()
        : new Date(b.arrivalTime).getTime() - new Date(a.arrivalTime).getTime();
    }
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setFilterModalVisible(false);
  };

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
          onPress={refreshSchedules}
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
          placeholder="Search stations or trains" 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
        <FilterButton onPress={() => setFilterModalVisible(true)} />
      </View>
      
      <FlatList
        data={sortedSchedules}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ScheduleCard schedule={item} />}
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
              No schedules found
            </Text>
          </View>
        }
      />

      <FilterModal 
        visible={filterModalVisible} 
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
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