/**
 * AppStack
 * ------------------------------------------------------------------
 * Pila de navegación para usuarios AUTENTICADOS. Actualmente contiene
 * solo el Dashboard, pero está lista para crecer (por ejemplo, una
 * pantalla de configuración) sin afectar la protección de rutas.
 * Se monta únicamente cuando existe una sesión activa (ver
 * RootNavigator), por lo que un usuario no autenticado nunca puede
 * llegar a estas pantallas.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../screens';
import { ROUTES } from '../constants/routes';
import { colors } from '../constants/theme';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.DASHBOARD}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
    </Stack.Navigator>
  );
}
