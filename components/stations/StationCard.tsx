import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { MapPin, Star as StarIcon } from 'lucide-react-native';
import { Station } from '@/types';

interface StationCardProps {
  station: Station;
  onToggleFavorite: () => void;
}

export const StationCard: React.FC<StationCardProps> = ({ 
  station, 
  onToggleFavorite 
}) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background.secondary,
          borderColor: colors.borderLight
        }
      ]}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <MapPin size={20} color={colors.primary} />
        </View>
        <View style={styles.stationInfo}>
          <Text style={[styles.stationName, { color: colors.text.primary }]}>
            {station.name}
          </Text>
          <Text style={[styles.stationAddress, { color: colors.text.secondary }]}>
            {station.address}
          </Text>
          
          <View style={styles.linesContainer}>
            {station.lines.map((line) => (
              <View 
                key={line.id} 
                style={[
                  styles.lineTag, 
                  { backgroundColor: line.color || colors.primary }
                ]}
              >
                <Text style={[styles.lineText, { color: colors.white }]}>
                  {line.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={onToggleFavorite}
      >
        <StarIcon 
          size={22} 
          color={station.isFavorite ? colors.warning : colors.borderLight} 
          fill={station.isFavorite ? colors.warning : 'transparent'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
    paddingTop: 2,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  stationAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  linesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lineTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  lineText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  favoriteButton: {
    padding: 4,
    justifyContent: 'center',
  },
});