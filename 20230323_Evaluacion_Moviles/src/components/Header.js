/**
 * Header
 * ------------------------------------------------------------------
 * Encabezado reutilizable para pantallas. Soporta un título, un
 * subtítulo opcional y un elemento de acción a la derecha (por
 * ejemplo, un botón de cerrar sesión).
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export default function Header({ title, subtitle, right, align = 'left' }) {
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={[styles.title, align === 'center' && styles.centerText]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, align === 'center' && styles.centerText]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  textGroup: {
    flexShrink: 1,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  centerText: {
    textAlign: 'center',
  },
  right: {
    marginLeft: spacing.md,
  },
});
