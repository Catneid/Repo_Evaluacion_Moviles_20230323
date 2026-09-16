/**
 * LoginScreen
 * ------------------------------------------------------------------
 * Permite iniciar sesión con correo y contraseña mediante Firebase
 * Authentication. Al autenticarse correctamente, el RootNavigator
 * detecta el cambio de sesión (ver src/hooks/useAuth.js) y redirige
 * automáticamente al Dashboard — no se navega manualmente aquí.
 * ------------------------------------------------------------------
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CustomInput, CustomButton, Banner, ScreenContainer } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { validateEmail, validateLoginPassword } from '../utils/validators';
import { getFriendlyErrorMessage } from '../utils/firebaseErrors';
import { colors, spacing, typography } from '../constants/theme';
import { ROUTES } from '../constants/routes';

const VALIDATORS = {
  email: validateEmail,
  password: validateLoginPassword,
};

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { values, errors, setField, validate } = useForm(
    { email: '', password: '' },
    VALIDATORS
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async () => {
    setFormError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      // La navegación al Dashboard ocurre automáticamente al cambiar
      // el estado de autenticación (ver RootNavigator).
    } catch (error) {
      setFormError(getFriendlyErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.brand}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>CP</Text>
        </View>
        <Text style={styles.appName}>CampusPass</Text>
        <Text style={styles.tagline}>Tu identificación estudiantil, siempre a la mano</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>

        <Banner type="error" message={formError} />

        <CustomInput
          label="Correo electrónico"
          placeholder="tucorreo@universidad.edu"
          value={values.email}
          onChangeText={(text) => setField('email', text)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />

        <CustomInput
          label="Contraseña"
          placeholder="Tu contraseña"
          value={values.password}
          onChangeText={(text) => setField('password', text)}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        <CustomButton
          title="Iniciar sesión"
          onPress={handleSubmit}
          loading={isSubmitting}
          style={styles.submitButton}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
          <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)} hitSlop={8}>
            <Text style={styles.footerLink}>Regístrate</Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  brand: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    color: colors.textInverse,
    fontSize: 26,
    fontWeight: '800',
  },
  appName: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footerLink: {
    ...typography.bodyBold,
    color: colors.primary,
  },
});
