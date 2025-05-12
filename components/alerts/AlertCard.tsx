import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Alert } from '@/types';
import { formatRelativeTime } from '@/utils/dateTimeUtils';
import { TriangleAlert as AlertTriangle, ChevronRight } from 'lucide-react-native';

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const { colors } = useTheme();
  
  // Get the severity color
  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.info;
      default:
        return colors.info;
    }
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
        <View style={styles.severityContainer}>
          <AlertTriangle size={16} color={getSeverityColor()} />
          <Text 
            style={[
              styles.severityText, 
              { color: getSeverityColor() }
            ]}
          >
            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
          </Text>
        </View>
        
        <Text style={[styles.timeText, { color: colors.text.tertiary }]}>
          {formatRelativeTime(alert.timestamp)}
        </Text>
      </View>
      
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {alert.title}
      </Text>
      
      <Text style={[styles.description, { color: colors.text.secondary }]}>
        {alert.description}
      </Text>
      
      <View style={styles.affectedLinesContainer}>
        <Text style={[styles.affectedText, { color: colors.text.secondary }]}>
          Affected Lines:
        </Text>
        <View style={styles.lineTagsContainer}>
          {alert.affectedLines.map((line) => (
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
      
      <View style={[styles.footer, { borderTopColor: colors.borderLight }]}>
        <Text style={[styles.detailsText, { color: colors.primary }]}>
          View Details
        </Text>
        <ChevronRight size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  affectedLinesContainer: {
    marginBottom: 16,
  },
  affectedText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  lineTagsContainer: {
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  detailsText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
});