/**
 * RootNavigator
 * ------------------------------------------------------------------
 * Punto central de control de sesión y navegación. Decide qué pila
 * de navegación montar según el estado de autenticación:
 *
 *   - initializing === true  -> pantalla de carga (no se decide nada
 *                                todavía, evita parpadeos/flash).
 *   - user === null           -> AuthStack (Login / Registro).
 *   - user !== null           -> AppStack (Dashboard).
 *
 * Este patrón es lo que IMPIDE que un usuario no autenticado acceda
 * directamente al Dashboard: la pantalla de Dashboard ni siquiera
 * existe en el árbol de navegación hasta que hay una sesión válida.
 * También asegura la redirección automática a Login apenas se cierra
 * sesión, porque el cambio de `user` desmonta AppStack por completo.
 * ------------------------------------------------------------------
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { LoadingOverlay } from '../components';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function RootNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <LoadingOverlay message="Verificando tu sesión…" />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
