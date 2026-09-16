# CampusPass 🪪

Aplicación móvil desarrollada como evaluación del curso de **Desarrollo de Aplicaciones Móviles**. CampusPass funciona como una credencial estudiantil digital: permite que un estudiante cree una cuenta, inicie sesión de forma segura y consulte/actualice su información personal (nombre, fecha de nacimiento, carnet institucional, foto y correo) almacenada en la nube.

## 1. Información del proyecto

- **Nombre del proyecto:** CampusPass
- **Descripción breve:** aplicación móvil de autenticación y gestión de perfil estudiantil construida con React Native (Expo), Firebase Authentication y Cloud Firestore.
- **Objetivo:** permitir que un usuario se registre y autentique mediante Firebase Authentication y, una vez autenticado, visualice y actualice su información personal almacenada en Cloud Firestore, dentro de una interfaz moderna, coherente y fácil de usar.

## 2. Integrantes

| Nombre completo | Carnet |
|---|---|
| Gabriel Antonio Ramirez Pacheco | 20230323 |

*(Trabajo individual)*

## 3. Tecnologías

- **React Native** — framework para construir la interfaz nativa multiplataforma.
- **Expo (SDK 57)** — toolchain y runtime que simplifica el desarrollo, la ejecución y la compilación del proyecto.
- **Firebase Authentication** — gestión de registro, inicio de sesión, cierre de sesión y persistencia de la sesión del usuario.
- **Cloud Firestore** — base de datos NoSQL en la nube donde se almacena y actualiza el perfil de cada usuario.

## 4. Dependencias

| Paquete | Función |
|---|---|
| `expo` | Núcleo del framework Expo: herramientas de desarrollo, empaquetado y APIs multiplataforma. |
| `expo-status-bar` | Controla la apariencia (claro/oscuro) de la barra de estado del dispositivo. |
| `expo-splash-screen` | Controla la pantalla de carga nativa (splash screen) personalizada de la app. |
| `react` / `react-native` | Librerías base para construir la interfaz de usuario con componentes. |
| `@react-navigation/native` | Motor de navegación entre pantallas. |
| `@react-navigation/native-stack` | Navegador tipo pila (stack) nativo, usado para Login → Registro y Dashboard. |
| `react-native-screens` | Optimiza el uso de pantallas nativas requerido por React Navigation. |
| `react-native-safe-area-context` | Maneja las áreas seguras del dispositivo (notch, barra de estado, gestos). |
| `firebase` | SDK oficial de Firebase (Authentication + Cloud Firestore). |
| `@react-native-async-storage/async-storage` | Almacenamiento local usado por Firebase Auth para **persistir la sesión** del usuario entre reinicios de la app. |

## 5. Paleta de colores

CampusPass utiliza una paleta consistente inspirada en tonos índigo (marca/acciones principales) y verde azulado (acentos y confirmaciones), definida centralmente en `src/constants/theme.js`.

| Color | HEX | Uso |
|---|---|---|
| Primary (Indigo 600) | `#4F46E5` | Botones principales, encabezados, splash screen, ícono |
| Primary Dark (Indigo 800) | `#3730A3` | Estados presionados / degradados |
| Primary Light (Indigo 50) | `#EEF2FF` | Fondos suaves, chips, íconos secundarios |
| Secondary (Teal 500) | `#14B8A6` | Acentos, insignia de verificación |
| Background (Slate 50) | `#F8FAFC` | Fondo general de la app y splash screen |
| Surface | `#FFFFFF` | Tarjetas, inputs, superficies elevadas |
| Text Primary (Slate 900) | `#0F172A` | Texto principal |
| Text Secondary (Slate 500) | `#64748B` | Texto secundario / descripciones |
| Border (Slate 200) | `#E2E8F0` | Bordes de inputs y tarjetas |
| Success (Green 600) | `#16A34A` | Mensajes de éxito |
| Error (Red 600) | `#DC2626` | Mensajes de error / validación |
| Warning (Amber 600) | `#D97706` | Advertencias |

## 6. Estructura del proyecto

```
CampusPass/
├── App.js                     # Punto de entrada: AuthProvider + RootNavigator
├── app.json                   # Configuración de Expo (ícono, splash, nombre, identificadores)
├── .env.example                # Plantilla de variables de entorno (sin credenciales reales)
├── .env                        # Variables de entorno reales (NO se sube a git)
├── assets/                     # Ícono, splash y recursos gráficos
└── src/
    ├── components/              # Componentes reutilizables (Input, Button, Card, Header, etc.)
    ├── screens/                 # Login, Register, Dashboard
    ├── navigation/               # AuthStack, AppStack, RootNavigator (control de sesión)
    ├── services/                # authService.js, userService.js (llamadas a Firebase)
    ├── config/                  # firebase.js (inicialización de Firebase)
    ├── hooks/                   # useAuth.js (contexto global de sesión), useForm.js
    ├── utils/                   # validators.js, firebaseErrors.js
    └── constants/                # theme.js (paleta/tipografía/espaciados), routes.js
```

## 7. Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd 20230323_Evaluacion_Moviles
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Crear el archivo `.env`**

   Copia el archivo de ejemplo y renómbralo:

   ```bash
   cp .env.example .env
   ```

4. **Configurar Firebase**

   1. Ve a la [Consola de Firebase](https://console.firebase.google.com/) y crea un proyecto nuevo (o usa uno existente).
   2. Habilita **Authentication → Sign-in method → Correo electrónico/contraseña**.
   3. Crea una base de datos de **Cloud Firestore** (modo producción o prueba, según prefieras).
   4. Registra una app web dentro del proyecto de Firebase para obtener las credenciales (`apiKey`, `authDomain`, `projectId`, etc.).
   5. Copia esos valores dentro de tu archivo `.env`:

      ```
      EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
      EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
      EXPO_PUBLIC_FIREBASE_APP_ID=tu_app_id
      ```

   6. (Opcional pero recomendado) Configura las **reglas de seguridad de Firestore** para que cada usuario solo pueda leer/escribir su propio documento:

      ```
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /users/{userId} {
            allow read, update: if request.auth != null && request.auth.uid == userId;
            allow create: if request.auth != null && request.auth.uid == userId;
          }
        }
      }
      ```

5. **Ejecutar el proyecto** (ver sección siguiente).

## 8. Ejecución

Iniciar el servidor de desarrollo de Expo:

```bash
npx expo start
```

Desde la terminal que se abre puedes:

- Presionar **`a`** para abrir en un emulador/dispositivo Android.
- Presionar **`i`** para abrir en un simulador/dispositivo iOS (requiere macOS).
- Presionar **`w`** para abrir la versión web.
- Escanear el código QR con la app **Expo Go** desde un dispositivo físico.

También puedes usar los scripts definidos en `package.json`:

```bash
npm run android   # Inicia y abre en Android
npm run ios       # Inicia y abre en iOS
npm run web       # Inicia y abre en el navegador
```

## 9. Funcionalidades implementadas

- **Registro** de usuarios (nombre completo, fecha de nacimiento, carnet, URL de imagen, correo y contraseña) con validaciones y creación automática del documento del usuario en Firestore.
- **Login** con correo y contraseña, validación de campos y mensajes de error claros y traducidos al español.
- **Dashboard/Perfil** protegido: muestra los datos del usuario, permite editarlos y guardarlos en Firestore, con confirmación visual de éxito.
- **Persistencia de sesión**: al cerrar y volver a abrir la app, el usuario continúa autenticado (gracias a `AsyncStorage` + Firebase Auth).
- **Protección de rutas**: un usuario no autenticado nunca puede acceder al Dashboard; la navegación cambia automáticamente según el estado de sesión.
- **Cierre de sesión** con redirección automática a Login.
- **Componentes reutilizables**: `CustomInput`, `CustomButton`, `InfoCard`, `Header`, `Avatar`, `Banner`, `EmptyState`, `LoadingOverlay`, `ScreenContainer`.
- **Manejo de errores** de Firebase Authentication y Cloud Firestore traducidos a mensajes comprensibles.
- **Identidad visual personalizada**: paleta de colores propia, ícono e ilustración de splash screen a medida.

## 10. Notas de seguridad

- Ninguna credencial de Firebase está escrita directamente en el código fuente: todas se leen desde variables de entorno con el prefijo `EXPO_PUBLIC_`, cargadas automáticamente por Expo desde `.env`.
- El archivo `.env` está excluido mediante `.gitignore` y **nunca** debe subirse al repositorio. `.env.example` sí se incluye como plantilla para que cualquier persona pueda configurar sus propias credenciales.
