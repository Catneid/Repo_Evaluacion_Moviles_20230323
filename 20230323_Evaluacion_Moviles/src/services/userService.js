/**
 * src/services/userService.js
 * ------------------------------------------------------------------
 * Capa de servicio para leer y escribir el documento de perfil del
 * usuario en Cloud Firestore.
 *
 * Estructura en Firestore:
 *   users
 *   └── {UID_DEL_USUARIO}
 *       ├── nombreCompleto
 *       ├── fechaNacimiento
 *       ├── carnet
 *       ├── imagenUrl
 *       ├── email
 *       ├── creadoEn      (Timestamp del servidor)
 *       └── actualizadoEn (Timestamp del servidor)
 * ------------------------------------------------------------------
 */
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const USERS_COLLECTION = 'users';

function userDocRef(uid) {
  return doc(db, USERS_COLLECTION, uid);
}

/**
 * Crea el documento de perfil de un usuario recién registrado.
 */
export async function createUserProfile(uid, profileData) {
  const { nombreCompleto, fechaNacimiento, carnet, imagenUrl, email } = profileData;

  await setDoc(userDocRef(uid), {
    nombreCompleto: nombreCompleto.trim(),
    fechaNacimiento,
    carnet: carnet.trim(),
    imagenUrl: imagenUrl.trim(),
    email: email.trim(),
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp(),
  });
}

/**
 * Obtiene el documento de perfil de un usuario por su UID.
 * @returns {Promise<object|null>} los datos del perfil, o null si no existe.
 */
export async function getUserProfile(uid) {
  const snapshot = await getDoc(userDocRef(uid));
  if (!snapshot.exists()) {
    return null;
  }
  return { id: snapshot.id, ...snapshot.data() };
}

/**
 * Actualiza campos específicos del perfil del usuario en Firestore.
 */
export async function updateUserProfile(uid, updates) {
  await updateDoc(userDocRef(uid), {
    ...updates,
    actualizadoEn: serverTimestamp(),
  });
}
