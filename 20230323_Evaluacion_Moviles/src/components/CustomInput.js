/**
 * CustomInput
 * ------------------------------------------------------------------
 * Campo de formulario reutilizable con label, mensaje de error,
 * estado de foco y soporte para mostrar/ocultar contraseña.
 *
 * Props:
 *  - label: string
 *  - value, onChangeText: controlados desde el formulario padre
 *  - error: string | null — mensaje de validación a mostrar
 *  - secureTextEntry: boolean
 *  - helperText: string — texto de ayuda cuando no hay error
 *  - ...resto de props válidas de <TextInput />
 */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, radii, typography } from '../constants/theme';

export default function CustomInput({
  label,
  value,
  onChangeText,
  error,
  helperText,
  secureTextEntry,
  containerStyle,
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(false);
  const canToggleSecure = !!secureTextEntry;
  const isDisabled = rest.editable === false;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          !!error && styles.inputWrapperError,
          isDisabled && styles.inputWrapperDisabled,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={canToggleSecure && !isSecureVisible}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, isDisabled && styles.inputDisabled]}
          accessibilityLabel={label}
          {...rest}
        />
        {canToggleSecure ? (
          <Pressable
            onPress={() => setIsSecureVisible((prev) => !prev)}
            hitSlop={10}
            style={styles.toggleButton}
            accessibilityRole="button"
            accessibilityLabel={isSecureVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Text style={styles.toggleText}>{isSecureVisible ? 'Ocultar' : 'Mostrar'}</Text>
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
  },
  inputWrapperFocused: {
    borderColor: colors.borderFocus,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  inputWrapperDisabled: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
  },
  inputDisabled: {
    color: colors.textMuted,
  },
  toggleButton: {
    paddingLeft: spacing.sm,
    paddingVertical: spacing.xs,
  },
  toggleText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
