import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useRoutes } from '@/hooks/useRoutes';
import { useStations } from '@/hooks/useStations';
import { Station, Route } from '@/types';
import { RouteCard } from '@/components/routes/RouteCard';
import { StationSelector } from '@/components/routes/StationSelector';
import { Button } from '@/components/common/Button';
import { ArrowRight } from 'lucide-react-native';

export default function RoutesScreen() {
  const { colors } = useTheme();
  const { findRoutes, loading, routes } = useRoutes();
  const { stations } = useStations();
  
  const [sourceStation, setSourceStation] = useState<Station | null>(null);
  const [destinationStation, setDestinationStation] = useState<Station | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearchRoutes = () => {
    if (sourceStation && destinationStation) {
      findRoutes(sourceStation.id, destinationStation.id);
      setSearchPerformed(true);
    }
  };

  const handleSwapStations = () => {
    const temp = sourceStation;
    setSourceStation(destinationStation);
    setDestinationStation(temp);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Find Your Route
          </Text>
          
          <View style={styles.stationSelectors}>
            <StationSelector
              label="From"
              placeholder="Select departure station"
              stations={stations}
              selectedStation={sourceStation}
              onSelectStation={setSourceStation}
            />
            
            <TouchableOpacity 
              style={[styles.swapButton, { backgroundColor: colors.background.secondary }]} 
              onPress={handleSwapStations}
            >
              <ArrowRight size={18} color={colors.primary} style={styles.swapIcon} />
            </TouchableOpacity>
            
            <StationSelector
              label="To"
              placeholder="Select arrival station"
              stations={stations}
              selectedStation={destinationStation}
              onSelectStation={setDestinationStation}
            />
          </View>
          
          <Button 
            title="Find Routes" 
            onPress={handleSearchRoutes} 
            disabled={!sourceStation || !destinationStation || sourceStation.id === destinationStation.id}
          />
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : searchPerformed ? (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: colors.text.primary }]}>
              {routes.length > 0 
                ? `${routes.length} Route${routes.length !== 1 ? 's' : ''} Found` 
                : 'No Routes Found'}
            </Text>
            
            {routes.length > 0 ? (
              <FlatList
                data={routes}
                keyExtractor={(item: Route) => item.id.toString()}
                renderItem={({ item }) => <RouteCard route={item} />}
                scrollEnabled={false}
              />
            ) : (
              <Text style={[styles.noRoutesText, { color: colors.text.secondary }]}>
                No direct routes available between these stations.
                Try selecting different stations or check for connecting routes.
              </Text>
            )}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  stationSelectors: {
    marginBottom: 24,
  },
  swapButton: {
    alignSelf: 'center',
    padding: 8,
    borderRadius: 20,
    marginVertical: 8,
  },
  swapIcon: {
    transform: [{ rotate: '90deg' }],
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
  },
  resultsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  noRoutesText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    textAlign: 'center',
    padding: 16,
  },
});