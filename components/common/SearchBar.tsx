import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChangeText }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.background.secondary,
        borderColor: colors.borderLight
      }
    ]}>
      <Search size={20} color={colors.text.tertiary} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: colors.text.primary }]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 12,
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    padding: 0,
  },
});