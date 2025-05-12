import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  TextInput
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { MapPin, X, Search } from 'lucide-react-native';
import { Station } from '@/types';

interface StationSelectorProps {
  label: string;
  placeholder: string;
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
}

export const StationSelector: React.FC<StationSelectorProps> = ({
  label,
  placeholder,
  stations,
  selectedStation,
  onSelectStation,
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStation = (station: Station) => {
    onSelectStation(station);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>
        {label}
      </Text>
      
      <TouchableOpacity
        style={[
          styles.selector,
          { 
            backgroundColor: colors.background.secondary,
            borderColor: colors.borderLight
          }
        ]}
        onPress={() => setModalVisible(true)}
      >
        {selectedStation ? (
          <View style={styles.selectedStation}>
            <MapPin size={18} color={colors.primary} style={styles.stationIcon} />
            <Text style={[styles.stationName, { color: colors.text.primary }]}>
              {selectedStation.name}
            </Text>
          </View>
        ) : (
          <Text style={[styles.placeholder, { color: colors.text.tertiary }]}>
            {placeholder}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[
            styles.modalContent, 
            { backgroundColor: colors.background.primary }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                Select {label} Station
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setSearchQuery('');
                }}
              >
                <X size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={[
              styles.searchContainer, 
              { 
                backgroundColor: colors.background.secondary,
                borderColor: colors.borderLight
              }
            ]}>
              <Search size={20} color={colors.text.tertiary} style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text.primary }]}
                placeholder="Search stations"
                placeholderTextColor={colors.text.tertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  style={styles.clearButton} 
                  onPress={() => setSearchQuery('')}
                >
                  <X size={18} color={colors.text.tertiary} />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={filteredStations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.stationItem,
                    { borderBottomColor: colors.borderLight }
                  ]}
                  onPress={() => handleSelectStation(item)}
                >
                  <MapPin size={20} color={colors.primary} style={styles.stationItemIcon} />
                  <View style={styles.stationItemInfo}>
                    <Text style={[styles.stationItemName, { color: colors.text.primary }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.stationItemAddress, { color: colors.text.secondary }]}>
                      {item.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                    No stations found
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  selector: {
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  selectedStation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationIcon: {
    marginRight: 8,
  },
  stationName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 24,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  stationItemIcon: {
    marginRight: 12,
  },
  stationItemInfo: {
    flex: 1,
  },
  stationItemName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  stationItemAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});