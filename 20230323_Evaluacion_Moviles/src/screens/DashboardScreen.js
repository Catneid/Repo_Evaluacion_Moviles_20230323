/**
 * DashboardScreen
 * ------------------------------------------------------------------
 * Pantalla protegida (solo accesible con sesión activa). Muestra el
 * perfil del usuario almacenado en Cloud Firestore, permite editarlo
 * y guardarlo, y ofrece la acción de cerrar sesión.
 *
 * Al cerrar sesión, el RootNavigator detecta el cambio de estado de
 * autenticación y redirige automáticamente a Login.
 * ------------------------------------------------------------------
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, RefreshControl, ScrollView } from 'react-native';
import {
  CustomInput,
  CustomButton,
  Banner,
  ScreenContainer,
  InfoCard,
  Avatar,
  EmptyState,
  LoadingOverlay,
} from '../components';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import {
  validateFullName,
  validateBirthDate,
  validateCarnet,
  validateImageUrl,
} from '../utils/validators';
import { getFriendlyErrorMessage } from '../utils/firebaseErrors';
import { colors, spacing, radii, typography, shadows } from '../constants/theme';

const VALIDATORS = {
  nombreCompleto: validateFullName,
  fechaNacimiento: validateBirthDate,
  carnet: validateCarnet,
  imagenUrl: validateImageUrl,
};

export default function DashboardScreen() {
  const { user, profile, profileLoading, logout, saveProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { values, errors, setField, validate, reset } = useForm(
    {
      nombreCompleto: profile?.nombreCompleto || '',
      fechaNacimiento: profile?.fechaNacimiento || '',
      carnet: profile?.carnet || '',
      imagenUrl: profile?.imagenUrl || '',
    },
    VALIDATORS
  );

  // Mantiene el formulario sincronizado si el perfil se recarga
  // (por ejemplo, tras un pull-to-refresh).
  useEffect(() => {
    if (profile && !isEditing) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleEdit = () => {
    setFormError(null);
    setSuccessMessage(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();
    setFormError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setFormError(null);
    setSuccessMessage(null);
    if (!validate()) return;

    setIsSaving(true);
    try {
      await saveProfile({
        nombreCompleto: values.nombreCompleto.trim(),
        fechaNacimiento: values.fechaNacimiento,
        carnet: values.carnet.trim(),
        imagenUrl: values.imagenUrl.trim(),
      });
      setIsEditing(false);
      setSuccessMessage('Tu información se actualizó correctamente.');
    } catch (error) {
      setFormError(getFriendlyErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // La redirección a Login ocurre automáticamente vía RootNavigator.
    } catch (error) {
      setFormError(getFriendlyErrorMessage(error));
      setIsLoggingOut(false);
    }
  };

  if (profileLoading && !profile) {
    return <LoadingOverlay message="Cargando tu perfil…" />;
  }

  return (
    <ScreenContainer
      scroll={false}
      contentStyle={styles.flex}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={profileLoading} onRefresh={refreshProfile} />
        }
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hola,</Text>
            <Text style={styles.userName} numberOfLines={1}>
              {profile?.nombreCompleto?.split(' ')[0] || 'Estudiante'}
            </Text>
          </View>
          <Pressable
            onPress={handleLogout}
            disabled={isLoggingOut}
            style={styles.logoutButton}
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
          >
            <Text style={styles.logoutText}>{isLoggingOut ? 'Saliendo…' : 'Cerrar sesión'}</Text>
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <Avatar uri={profile?.imagenUrl} name={profile?.nombreCompleto} size={96} />
          <Text style={styles.profileName}>{profile?.nombreCompleto || 'Sin nombre registrado'}</Text>
          <Text style={styles.profileEmail}>{profile?.email || user?.email}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Carnet {profile?.carnet || '—'}</Text>
          </View>
        </View>

        <Banner type="success" message={successMessage} />
        <Banner type="error" message={formError} />

        {!profile && !profileLoading ? (
          <EmptyState
            icon="🗂️"
            title="Aún no hay datos de perfil"
            description="No encontramos tu información en la base de datos. Intenta cerrar sesión y crear tu cuenta nuevamente."
          />
        ) : !isEditing ? (
          <>
            <Text style={styles.sectionTitle}>Mi información</Text>
            <InfoCard icon="🧑" label="Nombre completo" value={profile?.nombreCompleto} />
            <InfoCard icon="🎂" label="Fecha de nacimiento" value={profile?.fechaNacimiento} />
            <InfoCard icon="🪪" label="Carnet institucional" value={profile?.carnet} />
            <InfoCard icon="✉️" label="Correo electrónico" value={profile?.email || user?.email} />
            <InfoCard icon="🖼️" label="URL de imagen" value={profile?.imagenUrl} />

            <CustomButton
              title="Editar información"
              variant="outline"
              onPress={handleEdit}
              style={styles.editButton}
            />
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Editar información</Text>

            <CustomInput
              label="Nombre completo"
              value={values.nombreCompleto}
              onChangeText={(text) => setField('nombreCompleto', text)}
              error={errors.nombreCompleto}
              autoCapitalize="words"
            />
            <CustomInput
              label="Fecha de nacimiento"
              placeholder="AAAA-MM-DD"
              value={values.fechaNacimiento}
              onChangeText={(text) => setField('fechaNacimiento', text)}
              error={errors.fechaNacimiento}
            />
            <CustomInput
              label="Carnet institucional"
              value={values.carnet}
              onChangeText={(text) => setField('carnet', text)}
              error={errors.carnet}
              autoCapitalize="characters"
            />
            <CustomInput
              label="URL de imagen de perfil"
              value={values.imagenUrl}
              onChangeText={(text) => setField('imagenUrl', text)}
              error={errors.imagenUrl}
              autoCapitalize="none"
              keyboardType="url"
            />
            <CustomInput
              label="Correo electrónico"
              value={profile?.email || user?.email || ''}
              editable={false}
              helperText="El correo no se puede modificar desde esta pantalla."
            />

            <View style={styles.editActions}>
              <CustomButton
                title="Cancelar"
                variant="outline"
                onPress={handleCancel}
                disabled={isSaving}
                style={styles.editActionButton}
              />
              <CustomButton
                title="Guardar cambios"
                onPress={handleSave}
                loading={isSaving}
                style={styles.editActionButton}
              />
            </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.body,
    color: colors.textSecondary,
  },
  userName: {
    ...typography.h1,
    color: colors.textPrimary,
    maxWidth: 220,
  },
  logoutButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    backgroundColor: colors.errorLight,
  },
  logoutText: {
    ...typography.caption,
    color: colors.error,
    fontWeight: '700',
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  profileName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  profileEmail: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    marginTop: spacing.sm,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryLight,
  },
  badgeText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  editButton: {
    marginTop: spacing.sm,
  },
  editActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  editActionButton: {
    flex: 1,
  },
});
