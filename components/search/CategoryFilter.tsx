import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Pressable, Text } from '@react-native-reusables/core';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'western', label: 'Western' },
  { id: 'central', label: 'Central' },
  { id: 'harbor', label: 'Harbor' },
  { id: 'trans', label: 'Trans' },
  { id: 'uran', label: 'Uran' },
  { id: 'pune', label: 'Pune' },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => onSelectCategory(category.id)}
          style={[
            styles.category,
            {
              backgroundColor:
                selectedCategory === category.id
                  ? colors.primary
                  : colors.background.secondary,
              borderColor:
                selectedCategory === category.id
                  ? colors.primary
                  : colors.borderLight,
            },
          ]}
          hoveredStyle={{
            backgroundColor:
              selectedCategory === category.id
                ? colors.primary
                : colors.background.tertiary,
          }}
          pressedStyle={{
            opacity: 0.8,
          }}
        >
          <Text
            style={[
              styles.categoryText,
              {
                color:
                  selectedCategory === category.id
                    ? colors.white
                    : colors.text.primary,
              },
            ]}
          >
            {category.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    gap: 8,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});