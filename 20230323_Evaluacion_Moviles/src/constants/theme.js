/**
 * src/constants/theme.js
 * ------------------------------------------------------------------
 * Fuente única de verdad para la identidad visual de CampusPass:
 * paleta de colores, espaciados, radios de borde, tipografía y
 * sombras. Todos los componentes y pantallas deben importar estos
 * valores en lugar de usar colores o medidas "mágicas".
 * ------------------------------------------------------------------
 */

export const colors = {
  // Marca
  primary: '#4F46E5', // Indigo 600 — acciones principales
  primaryDark: '#3730A3', // Indigo 800 — estados presionados
  primaryLight: '#EEF2FF', // Indigo 50 — fondos suaves / chips
  secondary: '#14B8A6', // Teal 500 — acentos, elementos secundarios
  secondaryDark: '#0F766E', // Teal 700

  // Fondo y superficies
  background: '#F8FAFC', // Slate 50
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9', // Slate 100

  // Texto
  textPrimary: '#0F172A', // Slate 900
  textSecondary: '#64748B', // Slate 500
  textMuted: '#94A3B8', // Slate 400
  textInverse: '#FFFFFF',

  // Bordes
  border: '#E2E8F0', // Slate 200
  borderFocus: '#4F46E5',

  // Estado
  success: '#16A34A',
  successLight: '#DCFCE7',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  warning: '#D97706',
  warningLight: '#FEF3C7',

  // Utilidad
  overlay: 'rgba(15, 23, 42, 0.55)',
  disabled: '#CBD5E1',
  white: '#FFFFFF',
  black: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  fontFamily: undefined, // usa la fuente del sistema; personalizable en el futuro
  h1: { fontSize: 30, fontWeight: '800', lineHeight: 38 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodyBold: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  caption: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
  button: { fontSize: 16, fontWeight: '700', lineHeight: 22 },
};

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
};

const theme = { colors, spacing, radii, typography, shadows };

export default theme;
