/**
 * ScreenContainer
 * ------------------------------------------------------------------
 * Envoltorio reutilizable para pantallas completas: aplica el fondo
 * de la app, maneja el área segura, evita que el teclado tape los
 * inputs y permite scroll cuando el contenido no cabe en pantalla.
 */
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../constants/theme';

export default function ScreenContainer({ children, scroll = true, style, contentStyle }) {
  const Content = scroll ? ScrollView : View;
  const contentProps = scroll
    ? {
        contentContainerStyle: [styles.scrollContent, contentStyle],
        keyboardShouldPersistTaps: 'handled',
        showsVerticalScrollIndicator: false,
      }
    : { style: [styles.content, contentStyle] };

  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        <Content {...contentProps}>{children}</Content>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
});
