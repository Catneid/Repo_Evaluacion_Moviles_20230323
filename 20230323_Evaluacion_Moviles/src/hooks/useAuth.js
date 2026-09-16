/**
 * src/hooks/useAuth.js
 * ------------------------------------------------------------------
 * Contexto global de autenticación. Se encarga de:
 *  - Detectar el estado de sesión actual (usuario autenticado o no).
 *  - Mantener la persistencia de sesión entre reinicios de la app
 *    (delegado a Firebase Auth + AsyncStorage, ver src/config/firebase.js).
 *  - Cargar y exponer el perfil de Firestore del usuario autenticado.
 *  - Ofrecer acciones (login, register, logout, refreshProfile) a toda
 *    la aplicación mediante el hook `useAuth()`.
 *
 * Este contexto es la base de la "protección de pantallas": mientras
 * `initializing` es true no se decide ninguna navegación, y una vez
 * resuelto, `user` determina si se muestra el flujo autenticado o el
 * de acceso (ver src/navigation/RootNavigator.js).
 * ------------------------------------------------------------------
 */
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import {
  loginWithEmail,
  registerWithEmail,
  logout as logoutService,
  subscribeToAuthChanges,
} from '../services/authService';
import { createUserProfile, getUserProfile, updateUserProfile } from '../services/userService';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const loadProfile = useCallback(async (uid) => {
    setProfileLoading(true);
    try {
      const data = await getUserProfile(uid);
      setProfile(data);
      return data;
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    // Detección del usuario autenticado + protección de pantallas:
    // este listener es la única fuente de verdad sobre la sesión.
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await loadProfile(firebaseUser.uid);
      } else {
        setProfile(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, [loadProfile]);

  const login = useCallback(async (email, password) => {
    const credential = await loginWithEmail(email, password);
    await loadProfile(credential.user.uid);
    return credential.user;
  }, [loadProfile]);

  const register = useCallback(async (email, password, profileData) => {
    const credential = await registerWithEmail(email, password);
    await createUserProfile(credential.user.uid, { ...profileData, email });
    await loadProfile(credential.user.uid);
    return credential.user;
  }, [loadProfile]);

  const logout = useCallback(async () => {
    await logoutService();
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return null;
    return loadProfile(user.uid);
  }, [user, loadProfile]);

  const saveProfile = useCallback(
    async (updates) => {
      if (!user) throw new Error('No hay un usuario autenticado.');
      await updateUserProfile(user.uid, updates);
      await loadProfile(user.uid);
    },
    [user, loadProfile]
  );

  const value = useMemo(
    () => ({
      user,
      profile,
      initializing,
      profileLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshProfile,
      saveProfile,
    }),
    [user, profile, initializing, profileLoading, login, register, logout, refreshProfile, saveProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>.');
  }
  return context;
}
