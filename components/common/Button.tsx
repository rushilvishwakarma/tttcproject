import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '@react-native-reusables/core';
import { Pressable } from '@react-native-reusables/pressables';
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
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          height: 48,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style
      ]}
      pressedStyle={{
        opacity: 0.8,
        transform: [{ scale: 0.98 }]
      }}
      disabledStyle={{
        opacity: 0.5
      }}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Inter-SemiBold',
            color: getTextColor()
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};