/**
 * Banner
 * ------------------------------------------------------------------
 * Mensaje de retroalimentación reutilizable (éxito, error, info) que
 * se muestra en la parte superior de un formulario. Sustituye a
 * Alert.alert para dar una experiencia más integrada al diseño.
 *
 * Props:
 *  - type: 'error' | 'success' | 'info'
 *  - message: string
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../constants/theme';

const VARIANTS = {
  error: {
    background: colors.errorLight,
    text: colors.error,
    icon: '⚠️',
  },
  success: {
    background: colors.successLight,
    text: colors.success,
    icon: '✅',
  },
  info: {
    background: colors.primaryLight,
    text: colors.primaryDark,
    icon: 'ℹ️',
  },
};

export default function Banner({ type = 'info', message }) {
  if (!message) return null;
  const palette = VARIANTS[type] || VARIANTS.info;

  return (
    <View
      style={[styles.container, { backgroundColor: palette.background }]}
      accessibilityRole="alert"
    >
      <Text style={styles.icon}>{palette.icon}</Text>
      <Text style={[styles.text, { color: palette.text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  text: {
    ...typography.caption,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});
