/**
 * src/utils/firebaseErrors.js
 * ------------------------------------------------------------------
 * Traduce los códigos de error técnicos de Firebase (Authentication y
 * Firestore) a mensajes claros y comprensibles para el usuario final,
 * en español.
 * ------------------------------------------------------------------
 */

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-email': 'El correo electrónico no tiene un formato válido.',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada. Contacta al administrador.',
  'auth/user-not-found': 'No existe una cuenta registrada con ese correo electrónico.',
  'auth/wrong-password': 'La contraseña ingresada es incorrecta.',
  'auth/invalid-credential': 'Correo electrónico o contraseña incorrectos.',
  'auth/invalid-login-credentials': 'Correo electrónico o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta registrada con ese correo electrónico.',
  'auth/weak-password': 'La contraseña es muy débil. Usa al menos 6 caracteres.',
  'auth/too-many-requests':
    'Demasiados intentos fallidos. Espera unos minutos antes de volver a intentarlo.',
  'auth/network-request-failed':
    'No se pudo conectar con el servidor. Revisa tu conexión a internet.',
  'auth/operation-not-allowed':
    'El inicio de sesión con correo y contraseña no está habilitado. Contacta al administrador.',
  'auth/requires-recent-login':
    'Por seguridad, debes volver a iniciar sesión para completar esta acción.',
  'auth/missing-password': 'Debes ingresar una contraseña.',
  'auth/missing-email': 'Debes ingresar un correo electrónico.',
  'auth/internal-error': 'Ocurrió un error inesperado. Inténtalo nuevamente.',
};

const FIRESTORE_ERROR_MESSAGES = {
  'permission-denied': 'No tienes permiso para realizar esta acción.',
  unavailable: 'El servicio no está disponible en este momento. Revisa tu conexión a internet.',
  'not-found': 'No se encontró la información solicitada.',
  cancelled: 'La operación fue cancelada.',
  'deadline-exceeded': 'La operación tardó demasiado. Inténtalo nuevamente.',
  'resource-exhausted': 'Se alcanzó el límite de uso. Inténtalo más tarde.',
  unauthenticated: 'Debes iniciar sesión para realizar esta acción.',
};

const GENERIC_ERROR_MESSAGE =
  'Ocurrió un problema inesperado. Inténtalo nuevamente en unos momentos.';
const NETWORK_ERROR_MESSAGE = 'No se pudo establecer conexión. Revisa tu internet e inténtalo de nuevo.';

/**
 * Convierte un error de Firebase (Auth o Firestore) en un mensaje
 * amigable para mostrar en la interfaz.
 */
export function getFriendlyErrorMessage(error) {
  if (!error) return GENERIC_ERROR_MESSAGE;

  const code = error.code || '';

  if (code.startsWith('auth/')) {
    return AUTH_ERROR_MESSAGES[code] || GENERIC_ERROR_MESSAGE;
  }

  // Los códigos de error de Firestore no llevan prefijo "firestore/".
  if (FIRESTORE_ERROR_MESSAGES[code]) {
    return FIRESTORE_ERROR_MESSAGES[code];
  }

  if (code === 'unavailable' || /network/i.test(error.message || '')) {
    return NETWORK_ERROR_MESSAGE;
  }

  return error.message && error.message.length < 120 ? error.message : GENERIC_ERROR_MESSAGE;
}
