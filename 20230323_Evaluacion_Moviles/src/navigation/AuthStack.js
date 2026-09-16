/**
 * AuthStack
 * ------------------------------------------------------------------
 * Pila de navegación para usuarios NO autenticados: Login y Registro.
 * Se monta únicamente cuando no hay una sesión activa.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen } from '../screens';
import { ROUTES } from '../constants/routes';
import { colors } from '../constants/theme';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
}
