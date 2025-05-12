import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Route } from '@/types';
import { formatTime, formatDuration } from '@/utils/dateTimeUtils';
import { Clock, DollarSign } from 'lucide-react-native';

interface RouteCardProps {
  route: Route;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const { colors } = useTheme();
  
  // Calculate the number of transfers
  const transferCount = route.segments.length - 1;
  
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
      <View style={styles.headerRow}>
        <View style={styles.timeInfo}>
          <Text style={[styles.duration, { color: colors.text.primary }]}>
            {formatDuration(route.departureTime, route.arrivalTime)}
          </Text>
          <View style={styles.timeRow}>
            <Text style={[styles.timeText, { color: colors.text.secondary }]}>
              {formatTime(route.departureTime)} - {formatTime(route.arrivalTime)}
            </Text>
          </View>
        </View>
        
        <View style={styles.fareContainer}>
          <DollarSign size={14} color={colors.text.secondary} />
          <Text style={[styles.fareText, { color: colors.text.secondary }]}>
            ${route.fare.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={styles.transferInfo}>
        <Text style={[styles.transferText, { color: colors.text.secondary }]}>
          {transferCount === 0 
            ? 'Direct Route' 
            : `${transferCount} Transfer${transferCount > 1 ? 's' : ''}`}
        </Text>
      </View>
      
      <View style={styles.segmentsContainer}>
        {route.segments.map((segment, index) => (
          <View key={index} style={styles.segment}>
            <View style={styles.segmentLine}>
              <View 
                style={[
                  styles.lineIndicator, 
                  { backgroundColor: segment.line.color || colors.primary }
                ]} 
              />
              {index < route.segments.length - 1 && (
                <View 
                  style={[
                    styles.transferIndicator, 
                    { borderColor: colors.borderLight }
                  ]} 
                />
              )}
            </View>
            
            <View style={styles.segmentDetails}>
              <View style={styles.segmentHeader}>
                <Text style={[styles.lineName, { color: colors.text.primary }]}>
                  {segment.line.name}
                </Text>
                <Text style={[styles.segmentTime, { color: colors.text.tertiary }]}>
                  {formatTime(segment.departureTime)} - {formatTime(segment.arrivalTime)}
                </Text>
              </View>
              
              <View style={styles.stationInfo}>
                <Text style={[styles.stationName, { color: colors.text.secondary }]}>
                  {segment.fromStation.name}
                </Text>
                <Text style={[styles.platformText, { color: colors.text.tertiary }]}>
                  Platform {segment.fromPlatform}
                </Text>
              </View>
              
              {index === route.segments.length - 1 && (
                <View style={styles.stationInfo}>
                  <Text style={[styles.stationName, { color: colors.text.secondary }]}>
                    {segment.toStation.name}
                  </Text>
                  <Text style={[styles.platformText, { color: colors.text.tertiary }]}>
                    Platform {segment.toPlatform}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  timeInfo: {
    flex: 1,
  },
  duration: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  fareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  fareText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 2,
  },
  transferInfo: {
    marginBottom: 16,
  },
  transferText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  segmentsContainer: {
    marginTop: 8,
  },
  segment: {
    flexDirection: 'row',
  },
  segmentLine: {
    width: 24,
    alignItems: 'center',
  },
  lineIndicator: {
    width: 4,
    flex: 1,
    borderRadius: 2,
  },
  transferIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  segmentDetails: {
    flex: 1,
    paddingLeft: 8,
    paddingBottom: 16,
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lineName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  segmentTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  stationInfo: {
    marginBottom: 8,
  },
  stationName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  platformText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
});