/**
 * CustomButton
 * ------------------------------------------------------------------
 * Botón reutilizable con variantes visuales y estado de carga.
 *
 * Props:
 *  - title: string
 *  - onPress: función
 *  - variant: 'primary' | 'secondary' | 'outline' | 'danger'
 *  - loading: boolean — muestra un spinner y deshabilita el botón
 *  - disabled: boolean
 *  - fullWidth: boolean (default true)
 */
import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, spacing, radii, typography } from '../constants/theme';

const VARIANT_STYLES = {
  primary: {
    background: colors.primary,
    backgroundPressed: colors.primaryDark,
    text: colors.textInverse,
    border: 'transparent',
  },
  secondary: {
    background: colors.secondary,
    backgroundPressed: colors.secondaryDark,
    text: colors.textInverse,
    border: 'transparent',
  },
  outline: {
    background: 'transparent',
    backgroundPressed: colors.primaryLight,
    text: colors.primary,
    border: colors.primary,
  },
  danger: {
    background: colors.errorLight,
    backgroundPressed: '#FCA5A5',
    text: colors.error,
    border: 'transparent',
  },
};

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  ...rest
}) {
  const palette = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        {
          backgroundColor: isDisabled
            ? colors.disabled
            : pressed
            ? palette.backgroundPressed
            : palette.background,
          borderColor: isDisabled ? colors.disabled : palette.border,
          borderWidth: palette.border === 'transparent' ? 0 : 1.5,
        },
        style,
      ]}
      {...rest}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={palette.text} style={{ marginRight: spacing.sm }} />
        ) : null}
        <Text
          style={[
            styles.text,
            { color: isDisabled && !loading ? colors.textMuted : palette.text },
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.button,
  },
});
