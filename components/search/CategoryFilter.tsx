import React from 'react';
import { View, ScrollView } from 'react-native';
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
      contentContainerStyle={{
        paddingVertical: 4,
        gap: 8,
      }}
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => onSelectCategory(category.id)}
          style={({ pressed }) => ({
            backgroundColor: selectedCategory === category.id
              ? colors.primary
              : pressed
                ? colors.background.tertiary
                : colors.background.secondary,
            borderColor: selectedCategory === category.id
              ? colors.primary
              : colors.borderLight,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Inter-Medium',
              color: selectedCategory === category.id
                ? colors.white
                : colors.text.primary,
            }}
          >
            {category.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};