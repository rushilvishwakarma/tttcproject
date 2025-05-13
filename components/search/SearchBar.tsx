import React from 'react';
import { View } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { TextInput } from '@react-native-reusables/core';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        borderColor: colors.borderLight,
        borderRadius: 12,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
      }}
    >
      <Search size={20} color={colors.text.tertiary} style={{ marginRight: 12 }} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search stations, routes, or trains"
        placeholderTextColor={colors.text.tertiary}
        style={{
          flex: 1,
          fontSize: 16,
          fontFamily: 'Inter-Regular',
          padding: 0,
          color: colors.text.primary,
        }}
      />
    </View>
  );
};