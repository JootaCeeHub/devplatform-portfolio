# DevPlatform

Un prototipo moderno de frontend para una plataforma de desarrollo colaborativo, construido con React, TypeScript, Vite y shadcn/ui.

## Overview
DevPlatform es un **prototipo de aplicación web** que muestra la visión de producto de un workspace integral para desarrollo: edición colaborativa de código, gestión de proyectos, operaciones de despliegue, gestión documental, onboarding, control por suscripción y flujos asistidos por IA.

Actualmente, el repositorio está enfocado principalmente en:

- Entregar una UX/UI sólida y profesional con componentes reutilizables.
- Demostrar módulos clave de plataforma con datos simulados e interfaces interactivas.
- Establecer una arquitectura React escalable (routing, lazy loading, error boundaries, hooks de analytics).

### Problema que intenta resolver
Los equipos de software suelen trabajar con herramientas desconectadas (editor, despliegue, documentación, chat, analytics, facturación). Este proyecto explora una experiencia unificada donde esos flujos conviven dentro de un solo producto.

### Estado actual del proyecto
**Estado: MVP / Prototipo de producto (en desarrollo activo).**

Razones:
- Los módulos principales están implementados a nivel de UI.
- Existen múltiples TODOs que indican integraciones de backend pendientes (auth, Stripe, Supabase, endpoints de analytics).
- La mayor parte de los datos es mock para demostración y validación de diseño.

## Features
### Experiencia pública
- Landing page de marketing con propuesta de valor, testimonios, captura de leads y resumen de precios.
- Pantalla de autenticación (login/registro/auth social).
- Página de pricing con selector mensual/anual y sección FAQ.

### Workspace de plataforma (`/platform`)
- Sidebar de navegación por secciones.
- Workspace con múltiples vistas:
  - **Code Editor** (explorador de archivos, tabs, área editable, preview/consola/herramientas).
  - **Project Manager** (cards de proyectos, filtros, templates, analytics).
  - **Deployment Panel** (entornos, historial de despliegues, vista CI/CD, monitoreo/logs).
  - **Documentation Center** (estructura de docs, recientes, templates y analytics).
- Paneles opcionales:
  - **Collaboration Panel** (usuarios activos, chat, actividad, controles de llamada).
  - **AI Assistant Panel** (acciones rápidas, chat y sugerencias).

### Fundaciones de plataforma
- Lazy loading por rutas para mejorar rendimiento.
- Error boundary global con diagnóstico en desarrollo y opciones de reporte.
- Proveedor de analytics en cliente + hooks auxiliares.
- Componentes de feature gating/suscripción listos para futura integración de billing.

## Tech Stack
- **Lenguaje:** TypeScript
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router DOM
- **Estado de servidor:** TanStack Query
- **Sistema UI:** shadcn/ui + Radix UI
- **Estilos:** Tailwind CSS + tailwindcss-animate
- **Íconos:** lucide-react
- **Formularios/validación presentes:** react-hook-form, zod, @hookform/resolvers
- **Gráficas:** recharts
- **Notificaciones:** sonner + hooks/componentes de toast
- **Linting:** ESLint + typescript-eslint

## Architecture
El proyecto sigue una estructura React orientada a features:

- **Entrada y composición de aplicación**
  - `src/main.tsx`: inicializa React.
  - `src/App.tsx`: providers + routing + páginas lazy.

- **Capa de páginas**
  - `src/pages/*`: experiencias por ruta (`Landing`, `Auth`, `Pricing`, `Index`, `NotFound`).

- **Componentes por dominio funcional**
  - `src/components/platform/*`: módulos principales del producto (workspace, IA, colaboración, sidebar).
  - `src/components/subscription/*`: primitives de control de acceso por plan.
  - `src/components/onboarding/*`: flujo de onboarding.
  - `src/components/analytics/*`: contexto/hooks de analítica.
  - `src/components/performance/*`: abstracciones de carga perezosa.

- **Capa de design system**
  - `src/components/ui/*`: componentes reutilizables basados en shadcn.

- **Utilidades compartidas**
  - `src/hooks/*` y `src/lib/*`.

## Installation
### Requisitos
- Node.js 18+ (recomendado)
- npm (o bun, ya que existe `bun.lockb`)

### Pasos
```bash
# 1) Clonar repositorio
git clone <YOUR_REPOSITORY_URL>

# 2) Entrar al directorio
cd devplatform-portfolio

# 3) Instalar dependencias
npm install

# 4) Levantar entorno de desarrollo
npm run dev
```

Por defecto, Vite está configurado para usar el puerto `8080`.

## Usage
### Rutas principales
- `/` → Landing
- `/auth` → Autenticación
- `/pricing` → Pricing
- `/platform` → Demo del workspace interno

### Flujo local típico
```bash
npm run dev       # servidor de desarrollo
npm run lint      # validación de lint
npm run build     # build de producción
npm run preview   # previsualización de build
```

## Project Structure
```text
.
├── public/                 # Assets estáticos
├── src/
│   ├── components/
│   │   ├── analytics/      # Provider y hooks de tracking
│   │   ├── onboarding/     # Experiencia de onboarding
│   │   ├── performance/    # Utilidades de lazy loading
│   │   ├── platform/       # Módulos principales (editor/proyectos/deploy/docs/IA/colaboración)
│   │   ├── subscription/   # Control de acceso por planes
│   │   └── ui/             # Primitivos UI reutilizables (shadcn/Radix)
│   ├── hooks/              # Hooks compartidos
│   ├── lib/                # Utilidades
│   ├── pages/              # Páginas por ruta
│   ├── App.tsx             # Providers + Router
│   └── main.tsx            # Punto de entrada
├── components.json         # Configuración de shadcn/ui
├── tailwind.config.ts      # Configuración de Tailwind
├── vite.config.ts          # Configuración de Vite
└── package.json            # Scripts + dependencias
```

## Development
### Scripts
- `npm run dev` → servidor de desarrollo
- `npm run build` → build de producción
- `npm run build:dev` → build en modo development
- `npm run lint` → linting
- `npm run preview` → preview local del build

### Notas para contribuir
- Mantener componentes UI reutilizables y composables.
- Priorizar composición por dominio en `src/components/platform/*`.
- Mantener el alias de imports (`@/` → `src/*`).
- Para features reales de backend, reemplazar primero los TODO de auth, billing, analytics y persistencia.

## Roadmap
Posibles próximos hitos:

1. **Integración backend**
   - Supabase/Auth para sesiones reales.
   - Persistencia de datos de proyectos, docs y workspace.

2. **Facturación y suscripciones**
   - Flujo completo con Stripe (checkout + webhooks).
   - Enforzamiento real de planes en `FeatureGate`.

3. **Colaboración e IA**
   - Colaboración en tiempo real con WebSocket/WebRTC.
   - Integración de IA en producción con persistencia de prompts/historial.

4. **Calidad y confiabilidad**
   - Suite de tests unitarios/integración/e2e.
   - Pipeline CI con quality gates automáticos.

5. **Preparación productiva**
   - Configuración de analytics por entorno.
   - Observabilidad, presupuestos de performance y hardening de seguridad.

## License
esto es personal y privado creado y desarrollado por mi JootaCee.

## Author
esto es personal y privado creado y desarrollado por mi JootaCee.
