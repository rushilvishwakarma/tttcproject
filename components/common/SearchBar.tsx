import React from 'react';
import { View } from 'react-native';
import { TextInput, Text } from '@react-native-reusables/core';
import { useTheme } from '@/contexts/ThemeContext';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder, 
  value, 
  onChangeText 
}) => {
  const { colors } = useTheme();
  
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 12,
        flex: 1,
        backgroundColor: colors.background.secondary,
        borderColor: colors.borderLight
      }}
    >
      <Search size={20} color={colors.text.tertiary} style={{ marginRight: 8 }} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        style={{
          flex: 1,
          fontSize: 16,
          fontFamily: 'Inter-Regular',
          padding: 0,
          color: colors.text.primary
        }}
      />
    </View>
  );
};