// src/theme/colors.ts

export const colors = {
  // Surface Hierarchy
  surface:                 '#f4faff',
  surfaceContainerLow:     '#e8f6ff',
  surfaceContainer:        '#def0fc',
  surfaceContainerHighest: '#d3e5f1',
  surfaceContainerLowest:  '#ffffff',

  // Primary (Icy Blue)
  primary:          '#00629d',
  primaryContainer: '#00a3ff',
  onPrimary:        '#ffffff',

  // Tertiary (Lightning Gold)
  tertiary:          '#705d00',
  tertiaryContainer: '#c9a900',
  tertiaryFixed:     '#ffe16d',
  onTertiary:        '#ffffff',

  // Text — NEVER pure black
  onSurface:        '#0c1e26',
  onSurfaceVariant: '#3f5260',

  // Borders (ghost only — felt, not seen)
  outlineVariant: 'rgba(190, 199, 212, 0.15)',

  // Semantic
  error:          '#ba1a1a',
  errorContainer: '#ffdad6',

  // Badge tones — used by MetricCard in ImpactDashboardScreen
  badge: {
    nutrition: '#48bb78',   // green — SNAP / food programs
    energy:    '#f6ad55',   // amber — LIHEAP / energy programs
  },

  // Legacy aliases — kept so teammate's existing code compiles without changes
  // Prefer the tokens above for all new work
  background: '#f4faff',   // alias for surface
  text: {
    primary:   '#ffffff',   // alias for onPrimary (white text on colored surfaces)
    secondary: '#cfe5ff',   // alias for primaryFixed (muted text on dark surfaces)
  },
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,  // large containers — softens the gov edge
} as const;

export const spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  7:  28,
  8:  32,
  12: 48,
  16: 88,
} as const;

// Ambient shadow — 6% opacity tinted with onSurface
export const shadow = {
  shadowColor:   '#0c1e26',
  shadowOffset:  { width: 0, height: 4 },
  shadowOpacity: 0.06,
  shadowRadius:  24,
  elevation:     3,
} as const;