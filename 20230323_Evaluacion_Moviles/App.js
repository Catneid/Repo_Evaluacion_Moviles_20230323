/**
 * App.js
 * ------------------------------------------------------------------
 * Punto de entrada de la aplicación. Envuelve toda la app con el
 * AuthProvider (contexto global de sesión) y monta el RootNavigator,
 * que decide qué pantallas mostrar según el estado de autenticación.
 * ------------------------------------------------------------------
 */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/hooks/useAuth';
import RootNavigator from './src/navigation/RootNavigator';

// Mantiene visible el splash screen nativo hasta que la app esté lista.
SplashScreen.preventAutoHideAsync().catch(() => {
  /* noop: puede rechazar si ya estaba oculto */
});

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Aquí es el lugar para precargar fuentes, assets, etc. si la app
    // llegara a necesitarlo. Por ahora, marcamos como listo de inmediato.
    setIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <AuthProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
