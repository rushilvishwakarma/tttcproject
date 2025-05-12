import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
const lightTheme = {
  primary: '#0A84FF',
  secondary: '#30D158',
  accent: '#FF9F0A',
  error: '#FF453A',
  warning: '#FF9F0A',
  success: '#30D158',
  info: '#64D2FF',
  white: '#FFFFFF',
  black: '#000000',
  background: {
    primary: '#F2F2F7',
    secondary: '#FFFFFF',
    tertiary: '#E5E5EA',
  },
  text: {
    primary: '#000000',
    secondary: '#3C3C43',
    tertiary: '#8E8E93',
    contrast: '#FFFFFF'
  },
  border: '#D1D1D6',
  borderLight: '#E5E5EA',
  card: '#FFFFFF',
  notification: '#FF3B30'
};

const darkTheme = {
  primary: '#0A84FF',
  secondary: '#30D158',
  accent: '#FF9F0A',
  error: '#FF453A',
  warning: '#FF9F0A',
  success: '#30D158',
  info: '#64D2FF',
  white: '#FFFFFF',
  black: '#000000',
  background: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBF5',
    tertiary: '#8E8E93',
    contrast: '#000000'
  },
  border: '#38383A',
  borderLight: '#2C2C2E',
  card: '#1C1C1E',
  notification: '#FF453A'
};

type ThemeType = 'light' | 'dark';
type ThemeContextType = {
  theme: ThemeType;
  colors: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme() as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme || 'light');

  // Update theme when system theme changes
  useEffect(() => {
    setTheme(systemColorScheme || 'light');
  }, [systemColorScheme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);