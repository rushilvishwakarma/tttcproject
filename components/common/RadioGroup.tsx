import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Check } from 'lucide-react-native';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onSelect,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.option,
            {
              borderBottomColor: colors.borderLight,
            },
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text style={[styles.label, { color: colors.text.primary }]}>
            {option.label}
          </Text>
          <View
            style={[
              styles.radio,
              {
                borderColor:
                  selectedValue === option.value
                    ? colors.primary
                    : colors.borderLight,
                backgroundColor:
                  selectedValue === option.value
                    ? colors.primary
                    : 'transparent',
              },
            ]}
          >
            {selectedValue === option.value && (
              <Check size={12} color={colors.white} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});