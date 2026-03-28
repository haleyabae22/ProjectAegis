// src/theme/typography.ts
import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  displayLg: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 56,
    letterSpacing: -1.12,
    color: '#0c1e26',
  },
  headlineMd: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 28,
    color: '#0c1e26',
  },
  headlineSm: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 22,
    color: '#0c1e26',
  },
  bodyMd: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#0c1e26',
  },
  labelLg: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#0c1e26',
  },
  labelSm: {                  // <-- Add this
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#0c1e26',
  },
});