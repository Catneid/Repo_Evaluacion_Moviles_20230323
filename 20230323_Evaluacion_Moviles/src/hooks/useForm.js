/**
 * src/hooks/useForm.js
 * ------------------------------------------------------------------
 * Hook genérico y reutilizable para manejar el estado de formularios:
 * valores, errores de validación y helpers para actualizar campos.
 * Usado por Login, Registro y edición del Dashboard para evitar
 * duplicar lógica de formularios en cada pantalla.
 * ------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { runValidators, isFormValid } from '../utils/validators';

export function useForm(initialValues, validatorMap) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // `initialValues` puede cambiar de identidad en cada render (por
  // ejemplo, en el Dashboard depende del perfil cargado desde
  // Firestore). Lo guardamos en un ref para que `reset()` siempre
  // use el valor más reciente sin perder la estabilidad de la
  // función memorizada (evita el bug clásico de closures obsoletos
  // con useCallback + dependencias vacías).
  const initialValuesRef = useRef(initialValues);
  useEffect(() => {
    initialValuesRef.current = initialValues;
  });

  const setField = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Limpia el error del campo apenas el usuario empieza a corregirlo.
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validate = useCallback(() => {
    const nextErrors = runValidators(values, validatorMap);
    setErrors(nextErrors);
    return isFormValid(nextErrors);
  }, [values, validatorMap]);

  const reset = useCallback(() => {
    setValues(initialValuesRef.current);
    setErrors({});
  }, []);

  return { values, errors, setField, validate, setErrors, reset };
}
