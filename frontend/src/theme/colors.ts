export const colors = {
  primary: "#1A2B5F",
  accent: "#C9A84C",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  text: {
    primary: "#FFFFFF",
    secondary: "#A0AEC0"
  },
  success: "#48BB78",
  badge: {
    nutrition: "#68D391",
    energy: "#F6AD55"
  }
} as const;

export type AppColors = typeof colors;
