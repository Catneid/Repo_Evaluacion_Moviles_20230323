/**
 * src/utils/validators.js
 * ------------------------------------------------------------------
 * Funciones puras de validación reutilizadas por los formularios de
 * Login, Registro y edición de perfil. Cada validador recibe el valor
 * del campo y retorna un string con el mensaje de error, o `null`
 * si el valor es válido.
 * ------------------------------------------------------------------
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Acepta URLs http(s) que terminan en una extensión de imagen común,
// o cualquier URL http(s) razonable (algunos servicios no exponen la
// extensión en la ruta, p. ej. Google Photos, Cloudinary, etc.).
const URL_REGEX = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

export function validateRequired(value, fieldLabel = 'Este campo') {
  if (value === undefined || value === null || String(value).trim().length === 0) {
    return `${fieldLabel} es obligatorio.`;
  }
  return null;
}

export function validateFullName(value) {
  const requiredError = validateRequired(value, 'El nombre completo');
  if (requiredError) return requiredError;
  if (value.trim().length < 3) {
    return 'El nombre completo debe tener al menos 3 caracteres.';
  }
  if (!/^[a-zA-ZÀ-ÿñÑ\s'.-]+$/.test(value.trim())) {
    return 'El nombre completo solo puede contener letras y espacios.';
  }
  return null;
}

export function validateBirthDate(value) {
  const requiredError = validateRequired(value, 'La fecha de nacimiento');
  if (requiredError) return requiredError;

  // Se espera formato YYYY-MM-DD (compatible con <input type="date"> y
  // con un selector de fecha nativo).
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    return 'La fecha debe tener el formato AAAA-MM-DD.';
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return 'La fecha de nacimiento no es válida.';
  }

  const now = new Date();
  const minAgeDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
  if (date > now) {
    return 'La fecha de nacimiento no puede ser futura.';
  }
  if (date > minAgeDate) {
    return 'Debes tener al menos 10 años para registrarte.';
  }
  const maxAgeDate = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());
  if (date < maxAgeDate) {
    return 'La fecha de nacimiento no es válida.';
  }

  return null;
}

export function validateCarnet(value) {
  const requiredError = validateRequired(value, 'El carnet institucional');
  if (requiredError) return requiredError;
  if (!/^[a-zA-Z0-9-]{4,20}$/.test(value.trim())) {
    return 'El carnet debe contener solo letras, números y guiones (4 a 20 caracteres).';
  }
  return null;
}

export function validateImageUrl(value) {
  const requiredError = validateRequired(value, 'La URL de la imagen');
  if (requiredError) return requiredError;
  if (!URL_REGEX.test(value.trim())) {
    return 'Ingresa una URL de imagen válida (debe iniciar con http:// o https://).';
  }
  return null;
}

export function validateEmail(value) {
  const requiredError = validateRequired(value, 'El correo electrónico');
  if (requiredError) return requiredError;
  if (!EMAIL_REGEX.test(value.trim())) {
    return 'Ingresa un correo electrónico válido.';
  }
  return null;
}

export function validatePassword(value) {
  const requiredError = validateRequired(value, 'La contraseña');
  if (requiredError) return requiredError;
  if (value.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  return null;
}

export function validateLoginPassword(value) {
  // En login solo se exige presencia, no reglas de complejidad
  // (esas se validaron al momento del registro).
  return validateRequired(value, 'La contraseña');
}

/**
 * Ejecuta un mapa de validadores { campo: validador } sobre un objeto
 * de valores { campo: valor } y retorna un objeto de errores
 * { campo: mensaje } solo con las entradas inválidas.
 */
export function runValidators(values, validatorMap) {
  const errors = {};
  Object.entries(validatorMap).forEach(([field, validator]) => {
    const error = validator(values[field]);
    if (error) {
      errors[field] = error;
    }
  });
  return errors;
}

export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}
