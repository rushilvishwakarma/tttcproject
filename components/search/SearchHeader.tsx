import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryFilter } from '@/components/search/CategoryFilter';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={onSearchChange} />
      <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={onCategoryChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
});