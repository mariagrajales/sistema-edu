import { escuela } from '../../Portal/shared/constants/escuela'

export const loginContent = {
  topBar: {
    cycle: `Ciclo escolar ${escuela.ciclo}`,
    zone: "Zona escolar 14",
    plantelKey: "Plantel clave: 15DES0042K",
    themeLight: "Modo claro",
    themeDark: "Modo oscuro",
  },
  loginCard: {
    platformLabel: "Plataforma oficial de inclusión",
    institutionName: 'Secundaria Federal "Adolfo López Mateos"',
    subsystem: "subsistema de educación secundaria técnica y general",
    heading: "Iniciar sesión",
    subtitle: "Portal unificado para docentes, psicología escolar (SEE), asesoría y directivos.",
    email: {
      label: "Correo institucional",
      placeholder: "ejemplo.docente@sep.gob.mx",
      leadingIcon: "at",
      helperText: "Utilice exclusivamente su credencial digital autorizada por la plantilla directiva.",
      helperIcon: "shield",
    },
    password: {
      label: "Contraseña de acceso",
      trailingTag: "Alta seguridad",
      placeholder: "••••••••",
      leadingIcon: "lock",
    },
    remember: "Recordar sesión en este equipo institucional de trabajo",
    submit: "Ingresar al portal",
    forgotPassword: "¿Olvidó su contraseña o requiere desbloqueo de cuenta?",
    notices: [
      {
        tone: "policy" as const,
        icon: "info",
        title: "Política estricta de gestión de usuarios",
        body: "acceso dado de alta exclusivamente por la administración escolar; no se admiten registros externos.",
      },
      {
        tone: "privacy" as const,
        icon: "shield",
        title: "Protección y confidencialidad",
        body: "LGDNNA, resguardo de diagnósticos neurodivergentes de alumnos menores de edad.",
      },
    ],
  },
  sidePanel: {
    statusBadge: {
      label: "Red escolar de inclusión activa",
      dotColor: "#2F8F6B",
    },
    heroImageAlt: "Aula inclusiva con materiales escolares y figuras de accesibilidad",
    heroImageAltStudents: "Foto de estudiantes en una marcha inclusiva",
    inclusionQuote: {
      title: "Acompañamiento interdisciplinario",
      quote:
        "Comunidad educativa inclusiva • Espacio seguro de vinculación interdisciplinaria para maestros, psicología (SEE) y prefectura.",
      chips: [
        "Planes de ajuste razonable (DUA)",
        "Bitácora socioemocional",
        "Seguimiento 504 / USAER",
      ],
    },
    featureCards: [
      {
        icon: "lightbulb",
        background: "mint",
        title: "Atención neurodivergente",
        subtitle: "Enfoque DUA",
        description: "planes y ajustes pensados desde las fortalezas de cada estudiante.",
      },
      {
        icon: "lock",
        background: "mint",
        title: "Sesión segura y cifrada",
        subtitle: "Protocolo TLS 1.3",
        description: "tu sesión se cierra sola tras 20 minutos sin actividad, para proteger los datos.",
      },
    ],
  },
} as const;