import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Schedule } from '@/types';
import { formatTime, formatDuration } from '@/utils/dateTimeUtils';
import { Brain as Train, Dot, Clock } from 'lucide-react-native';

interface ScheduleCardProps {
  schedule: Schedule;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const { colors } = useTheme();

  // Check if the train is currently running (between departure and arrival times)
  const isRunning = () => {
    const now = new Date();
    const departureTime = new Date(schedule.departureTime);
    const arrivalTime = new Date(schedule.arrivalTime);
    return now >= departureTime && now <= arrivalTime;
  };

  // Get the status color based on schedule status
  const getStatusColor = () => {
    if (schedule.status === 'on-time') return colors.success;
    if (schedule.status === 'delayed') return colors.warning;
    if (schedule.status === 'cancelled') return colors.error;
    return colors.text.tertiary;
  };

  // Get the status text
  const getStatusText = () => {
    if (schedule.status === 'on-time') return 'On Time';
    if (schedule.status === 'delayed') 
      return `Delayed ${schedule.delayMinutes}m`;
    if (schedule.status === 'cancelled') return 'Cancelled';
    return schedule.status;
  };

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
        <View style={styles.trainInfo}>
          <Train size={16} color={colors.primary} />
          <Text style={[styles.trainName, { color: colors.text.primary }]}>
            {schedule.train.name}
          </Text>
          <View 
            style={[
              styles.trainTypeTag, 
              { backgroundColor: colors.background.tertiary }
            ]}
          >
            <Text style={[styles.trainType, { color: colors.text.secondary }]}>
              {schedule.train.type}
            </Text>
          </View>
        </View>
        <View style={[styles.statusTag, { backgroundColor: getStatusColor() + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.timeColumn}>
          <Text style={[styles.time, { color: colors.text.primary }]}>
            {formatTime(schedule.departureTime)}
          </Text>
          <View style={styles.durationContainer}>
            <Clock size={12} color={colors.text.tertiary} />
            <Text style={[styles.duration, { color: colors.text.tertiary }]}>
              {formatDuration(schedule.departureTime, schedule.arrivalTime)}
            </Text>
          </View>
          <Text style={[styles.time, { color: colors.text.primary }]}>
            {formatTime(schedule.arrivalTime)}
          </Text>
        </View>

        <View style={styles.routeLineContainer}>
          <View style={[styles.stationDot, { backgroundColor: colors.primary }]} />
          <View style={[styles.routeLine, { backgroundColor: colors.primary }]} />
          <View style={[styles.stationDot, { backgroundColor: colors.primary }]} />
        </View>

        <View style={styles.stationColumn}>
          <Text style={[styles.stationName, { color: colors.text.primary }]}>
            {schedule.sourceStation.name}
          </Text>
          <View style={styles.platformContainer}>
            <Text style={[styles.platformText, { color: colors.text.tertiary }]}>
              Platform {schedule.sourcePlatform}
            </Text>
          </View>
          <Text style={[styles.stationName, { color: colors.text.primary }]}>
            {schedule.destinationStation.name}
          </Text>
        </View>
      </View>

      {schedule.notes && (
        <View style={styles.notesContainer}>
          <Text style={[styles.notesText, { color: colors.text.secondary }]}>
            {schedule.notes}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  trainTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  trainType: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timeColumn: {
    width: 70,
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  routeLineContainer: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  stationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  stationColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  stationName: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  platformContainer: {
    alignSelf: 'flex-start',
  },
  platformText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  notesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
    marginTop: 4,
  },
  notesText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
});