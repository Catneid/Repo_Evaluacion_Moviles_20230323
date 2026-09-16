/**
 * RegisterScreen
 * ------------------------------------------------------------------
 * Crea una cuenta nueva mediante Firebase Authentication y, en el
 * mismo flujo, crea el documento correspondiente del usuario en
 * Cloud Firestore (colección "users", documento = UID).
 *
 * Al finalizar, el RootNavigator redirige automáticamente al
 * Dashboard porque el estado de autenticación cambia (ver useAuth).
 * ------------------------------------------------------------------
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CustomInput, CustomButton, Banner, ScreenContainer, Header } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import {
  validateFullName,
  validateBirthDate,
  validateCarnet,
  validateImageUrl,
  validateEmail,
  validatePassword,
} from '../utils/validators';
import { getFriendlyErrorMessage } from '../utils/firebaseErrors';
import { colors, spacing, typography } from '../constants/theme';
import { ROUTES } from '../constants/routes';

const VALIDATORS = {
  nombreCompleto: validateFullName,
  fechaNacimiento: validateBirthDate,
  carnet: validateCarnet,
  imagenUrl: validateImageUrl,
  email: validateEmail,
  password: validatePassword,
};

const INITIAL_VALUES = {
  nombreCompleto: '',
  fechaNacimiento: '',
  carnet: '',
  imagenUrl: '',
  email: '',
  password: '',
};

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { values, errors, setField, validate } = useForm(INITIAL_VALUES, VALIDATORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async () => {
    setFormError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register(values.email, values.password, {
        nombreCompleto: values.nombreCompleto,
        fechaNacimiento: values.fechaNacimiento,
        carnet: values.carnet,
        imagenUrl: values.imagenUrl,
      });
      // Redirección automática al Dashboard vía RootNavigator.
    } catch (error) {
      setFormError(getFriendlyErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer>
      <Header
        title="Crear cuenta"
        subtitle="Completa tus datos para generar tu carnet digital"
      />

      <View style={styles.card}>
        <Banner type="error" message={formError} />

        <CustomInput
          label="Nombre completo"
          placeholder="Ej. Ana María López Pérez"
          value={values.nombreCompleto}
          onChangeText={(text) => setField('nombreCompleto', text)}
          error={errors.nombreCompleto}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <CustomInput
          label="Fecha de nacimiento"
          placeholder="AAAA-MM-DD (ej. 2001-05-20)"
          value={values.fechaNacimiento}
          onChangeText={(text) => setField('fechaNacimiento', text)}
          error={errors.fechaNacimiento}
          helperText={!errors.fechaNacimiento ? 'Formato: Año-Mes-Día' : undefined}
          keyboardType="numbers-and-punctuation"
          returnKeyType="next"
        />

        <CustomInput
          label="Carnet institucional"
          placeholder="Ej. 20230323"
          value={values.carnet}
          onChangeText={(text) => setField('carnet', text)}
          error={errors.carnet}
          autoCapitalize="characters"
          returnKeyType="next"
        />

        <CustomInput
          label="URL de imagen de perfil"
          placeholder="https://ejemplo.com/mi-foto.jpg"
          value={values.imagenUrl}
          onChangeText={(text) => setField('imagenUrl', text)}
          error={errors.imagenUrl}
          autoCapitalize="none"
          keyboardType="url"
          returnKeyType="next"
        />

        <CustomInput
          label="Correo electrónico"
          placeholder="tucorreo@universidad.edu"
          value={values.email}
          onChangeText={(text) => setField('email', text)}
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />

        <CustomInput
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          value={values.password}
          onChangeText={(text) => setField('password', text)}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
          textContentType="newPassword"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        <CustomButton
          title="Crear cuenta"
          onPress={handleSubmit}
          loading={isSubmitting}
          style={styles.submitButton}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
          <Pressable onPress={() => navigation.navigate(ROUTES.LOGIN)} hitSlop={8}>
            <Text style={styles.footerLink}>Inicia sesión</Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
    flexWrap: 'wrap',
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
