/**
 * src/services/authService.js
 * ------------------------------------------------------------------
 * Capa de servicio que envuelve las llamadas a Firebase Authentication.
 * Las pantallas y hooks nunca llaman a la SDK de Firebase directamente:
 * siempre pasan por esta capa, lo que facilita pruebas y mantenimiento.
 * ------------------------------------------------------------------
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Crea una cuenta nueva en Firebase Authentication.
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export function registerWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email.trim(), password);
}

/**
 * Inicia sesión con correo y contraseña.
 */
export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

/**
 * Cierra la sesión del usuario actual.
 */
export function logout() {
  return signOut(auth);
}

/**
 * Suscribe un callback a los cambios de estado de autenticación.
 * Retorna la función de "unsubscribe" para limpiar el listener.
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Retorna el usuario actualmente autenticado (o null).
 */
export function getCurrentUser() {
  return auth.currentUser;
}
