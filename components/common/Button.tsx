import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: object;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  loading = false,
  style
}) => {
  const { colors } = useTheme();
  
  const getBackgroundColor = () => {
    if (disabled) return colors.borderLight;
    switch (variant) {
      case 'primary': return colors.primary;
      case 'secondary': return colors.secondary;
      case 'outline': return 'transparent';
      default: return colors.primary;
    }
  };
  
  const getTextColor = () => {
    if (disabled) return colors.text.tertiary;
    switch (variant) {
      case 'primary': return colors.white;
      case 'secondary': return colors.white;
      case 'outline': return colors.primary;
      default: return colors.white;
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return colors.borderLight;
    switch (variant) {
      case 'outline': return colors.primary;
      default: return 'transparent';
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});