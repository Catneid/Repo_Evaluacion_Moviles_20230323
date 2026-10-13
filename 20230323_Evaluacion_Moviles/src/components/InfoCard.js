/**
 * InfoCard
 * ------------------------------------------------------------------
 * Tarjeta reutilizable para mostrar un par etiqueta/valor dentro del
 * Dashboard (nombre, fecha de nacimiento, carnet, correo, etc.).
 *
 * Props:
 *  - label: string
 *  - value: string
 *  - icon: string — emoji o carácter simple usado como ícono decorativo
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography, shadows } from '../constants/theme';

export default function InfoCard({ label, value, icon }) {
  return (
    <View style={styles.card}>
      {icon ? (
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
      ) : null}
      <View style={styles.textWrapper}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={2}>
          {value && String(value).trim().length > 0 ? value : 'Sin información'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 18,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  value: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
});
