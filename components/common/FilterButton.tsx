import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SlidersHorizontal } from 'lucide-react-native';

interface FilterButtonProps {
  onPress: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
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
      onPress={onPress}
    >
      <SlidersHorizontal size={20} color={colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: 44,
    width: 44,
    marginLeft: 8,
  },
});