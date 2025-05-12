import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Check } from 'lucide-react-native';
import { Button } from '@/components/common/Button';
import { useStations } from '@/hooks/useStations';
import { RadioGroup } from '@/components/common/RadioGroup';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  currentFilters: {
    sourceStation: string;
    destinationStation: string;
    trainType: string;
    sortBy: string;
    sortOrder: string;
  };
}

export const FilterModal: React.FC<FilterModalProps> = ({ 
  visible, 
  onClose, 
  onApply,
  currentFilters 
}) => {
  const { colors } = useTheme();
  const { stations } = useStations();
  
  const [filters, setFilters] = useState(currentFilters);
  
  // Reset filters when modal opens
  useEffect(() => {
    setFilters(currentFilters);
  }, [visible, currentFilters]);
  
  const trainTypes = ['Express', 'Local', 'Rapid'];
  
  // Sort options
  const sortByOptions = [
    { value: 'departureTime', label: 'Departure Time' },
    { value: 'arrivalTime', label: 'Arrival Time' },
  ];
  
  const sortOrderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];
  
  const handleReset = () => {
    setFilters({
      sourceStation: '',
      destinationStation: '',
      trainType: '',
      sortBy: 'departureTime',
      sortOrder: 'asc'
    });
  };
  
  const handleApply = () => {
    onApply(filters);
  };
  
  // Filter selection handlers
  const handleSelectSourceStation = (stationName: string) => {
    setFilters(prev => ({ ...prev, sourceStation: stationName }));
  };
  
  const handleSelectDestinationStation = (stationName: string) => {
    setFilters(prev => ({ ...prev, destinationStation: stationName }));
  };
  
  const handleSelectTrainType = (trainType: string) => {
    setFilters(prev => ({ 
      ...prev, 
      trainType: prev.trainType === trainType ? '' : trainType 
    }));
  };
  
  const handleSelectSortBy = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };
  
  const handleSelectSortOrder = (sortOrder: string) => {
    setFilters(prev => ({ ...prev, sortOrder }));
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      
      <View style={[
        styles.modalContainer, 
        { backgroundColor: colors.background.primary }
      ]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text.primary }]}>
            Filter Schedules
          </Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={[styles.resetText, { color: colors.primary }]}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Train Type
            </Text>
            <View style={styles.trainTypeContainer}>
              {trainTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.trainTypeButton,
                    { 
                      backgroundColor: filters.trainType === type 
                        ? colors.primary + '20' 
                        : colors.background.secondary,
                      borderColor: filters.trainType === type 
                        ? colors.primary 
                        : colors.borderLight,
                    }
                  ]}
                  onPress={() => handleSelectTrainType(type)}
                >
                  {filters.trainType === type && (
                    <Check size={14} color={colors.primary} style={styles.checkIcon} />
                  )}
                  <Text 
                    style={[
                      styles.trainTypeText, 
                      { 
                        color: filters.trainType === type 
                          ? colors.primary 
                          : colors.text.secondary
                      }
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Sort By
            </Text>
            <RadioGroup
              options={sortByOptions}
              selectedValue={filters.sortBy}
              onSelect={handleSelectSortBy}
            />
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Sort Order
            </Text>
            <RadioGroup
              options={sortOrderOptions}
              selectedValue={filters.sortOrder}
              onSelect={handleSelectSortOrder}
            />
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Source Station
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.stationsList}
            >
              {stations.map((station) => (
                <TouchableOpacity
                  key={station.id}
                  style={[
                    styles.stationButton,
                    { 
                      backgroundColor: filters.sourceStation === station.name 
                        ? colors.primary + '20' 
                        : colors.background.secondary,
                      borderColor: filters.sourceStation === station.name 
                        ? colors.primary 
                        : colors.borderLight,
                    }
                  ]}
                  onPress={() => handleSelectSourceStation(station.name)}
                >
                  <Text 
                    style={[
                      styles.stationText, 
                      { 
                        color: filters.sourceStation === station.name 
                          ? colors.primary 
                          : colors.text.secondary
                      }
                    ]}
                  >
                    {station.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Destination Station
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.stationsList}
            >
              {stations.map((station) => (
                <TouchableOpacity
                  key={station.id}
                  style={[
                    styles.stationButton,
                    { 
                      backgroundColor: filters.destinationStation === station.name 
                        ? colors.primary + '20' 
                        : colors.background.secondary,
                      borderColor: filters.destinationStation === station.name 
                        ? colors.primary 
                        : colors.borderLight,
                    }
                  ]}
                  onPress={() => handleSelectDestinationStation(station.name)}
                >
                  <Text 
                    style={[
                      styles.stationText, 
                      { 
                        color: filters.destinationStation === station.name 
                          ? colors.primary 
                          : colors.text.secondary
                      }
                    ]}
                  >
                    {station.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button 
            title="Apply Filters" 
            onPress={handleApply} 
            style={styles.applyButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  resetText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  content: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  trainTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  trainTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 4,
  },
  trainTypeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  stationsList: {
    flexDirection: 'row',
  },
  stationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  stationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  applyButton: {
    width: '100%',
  },
});