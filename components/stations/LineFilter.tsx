import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X } from 'lucide-react-native';
import { Line } from '@/types';

interface LineFilterProps {
  lines: Line[];
  selectedLine: string | null;
  onSelectLine: (lineId: string | null) => void;
}

export const LineFilter: React.FC<LineFilterProps> = ({ 
  lines, 
  selectedLine, 
  onSelectLine 
}) => {
  const { colors } = useTheme();
  
  if (!lines.length) return null;
  
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.allButton,
            {
              backgroundColor: !selectedLine 
                ? colors.primary 
                : colors.background.secondary,
              borderColor: !selectedLine 
                ? colors.primary 
                : colors.borderLight,
            }
          ]}
          onPress={() => onSelectLine(null)}
        >
          <Text
            style={[
              styles.allButtonText,
              { color: !selectedLine ? colors.white : colors.text.secondary }
            ]}
          >
            All Lines
          </Text>
        </TouchableOpacity>
        
        {lines.map((line) => (
          <TouchableOpacity
            key={line.id}
            style={[
              styles.lineButton,
              {
                backgroundColor: selectedLine === line.id 
                  ? line.color || colors.primary 
                  : colors.background.secondary,
                borderColor: selectedLine === line.id 
                  ? line.color || colors.primary 
                  : colors.borderLight,
              }
            ]}
            onPress={() => onSelectLine(selectedLine === line.id ? null : line.id)}
          >
            <Text
              style={[
                styles.lineButtonText,
                { color: selectedLine === line.id ? colors.white : colors.text.secondary }
              ]}
            >
              {line.name}
            </Text>
            
            {selectedLine === line.id && (
              <X 
                size={14} 
                color={colors.white} 
                style={styles.clearIcon} 
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  allButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  allButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  lineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  lineButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  clearIcon: {
    marginLeft: 4,
  },
});