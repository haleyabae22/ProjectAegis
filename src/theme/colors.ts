export const colors = {
  light: {
    background: "#F6F7FB",
    surface: "#FFFFFF",
    text: "#111827",
    textMuted: "#6B7280",
    primary: "#0F766E",
    border: "#D1D5DB"
  },
  dark: {
    background: "#0B1020",
    surface: "#111827",
    text: "#F3F4F6",
    textMuted: "#9CA3AF",
    primary: "#5EEAD4",
    border: "#374151"
  }
};

export type ThemeName = keyof typeof colors;
