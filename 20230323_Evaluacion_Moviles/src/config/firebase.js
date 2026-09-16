/**
 * src/config/firebase.js
 * ------------------------------------------------------------------
 * Punto único de inicialización de Firebase para toda la aplicación.
 *
 * Las credenciales NUNCA se escriben directamente en el código fuente.
 * Se leen desde variables de entorno con el prefijo EXPO_PUBLIC_, que
 * Expo carga automáticamente desde el archivo ".env" en tiempo de
 * compilación (compatible de forma nativa con Expo SDK 49+, sin
 * necesidad de librerías adicionales).
 *
 * Ver ".env.example" para la lista de variables requeridas.
 * ------------------------------------------------------------------
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

if (__DEV__) {
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value || value.includes('your_'))
    .map(([key]) => key);

  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `[Firebase] Faltan variables de entorno o siguen con valores de ejemplo: ${missing.join(
        ', '
      )}. Revisa tu archivo .env (ver .env.example).`
    );
  }
}

// Evita reinicializar la app si el módulo se vuelve a evaluar
// (por ejemplo, con Fast Refresh durante el desarrollo).
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Autenticación con persistencia de sesión en el dispositivo mediante
// AsyncStorage. En web se usa getAuth() con la persistencia por defecto
// del navegador.
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    const storage = createAsyncStorage('campuspass-auth');
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(storage),
    });
  } catch (error) {
    // initializeAuth lanza un error si ya fue llamado antes (por ejemplo,
    // durante un Fast Refresh). En ese caso reutilizamos la instancia existente.
    auth = getAuth(app);
  }
}

const db = getFirestore(app);

export { app, auth, db };
