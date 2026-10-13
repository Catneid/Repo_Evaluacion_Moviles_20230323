/**
 * Avatar
 * ------------------------------------------------------------------
 * Muestra la imagen de perfil del usuario a partir de una URL. Si la
 * imagen falla al cargar o no existe, muestra un placeholder con las
 * iniciales del nombre sobre un fondo de la paleta.
 */
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, radii, typography } from '../constants/theme';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() || '');
  return initials.join('') || '?';
}

export default function Avatar({ uri, name, size = 88 }) {
  const [hasError, setHasError] = useState(false);
  const showImage = !!uri && !hasError;

  const dimensionStyle = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View style={[styles.wrapper, dimensionStyle]}>
      {showImage ? (
        <Image
          source={{ uri }}
          style={[styles.image, dimensionStyle]}
          onError={() => setHasError(true)}
          accessibilityLabel="Foto de perfil"
        />
      ) : (
        <View style={[styles.placeholder, dimensionStyle]}>
          <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{getInitials(name)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 3,
    borderColor: colors.surface,
    overflow: 'hidden',
    backgroundColor: colors.primaryLight,
  },
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  initials: {
    ...typography.h2,
    color: colors.textInverse,
  },
});
