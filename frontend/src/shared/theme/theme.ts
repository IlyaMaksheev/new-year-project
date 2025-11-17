// Base theme with modern palettes for light (pastel) and dark (vivid/glassy)
import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: { main: "#7C93D8", light: "#AFC0FF", dark: "#5A74C5", contrastText: "#0B1020" },
        secondary: { main: "#F29CB3", light: "#FFC7D8", dark: "#D9768E", contrastText: "#0B1020" },
        info: { main: "#7ED0F6", light: "#B8EAFF", dark: "#4BA9D4" },
        success: { main: "#98E9C1", light: "#CFF8E3", dark: "#69C99A" },
        warning: { main: "#FFD38B", light: "#FFE7BE", dark: "#E4A649" },
        error: { main: "#FF9AA2", light: "#FFC3C8", dark: "#E06A76" },
        background: { default: "#FAFBFF", paper: "#FFFFFF" },
        text: { primary: "#1F2937", secondary: "#4B5563" },
        divider: "#E6E8F0",
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: { main: "#8AB4F8", light: "#A7C5FF", dark: "#5E8BE8" },
        secondary: { main: "#FF6E7F", light: "#FF8FA0", dark: "#E05568" },
        info: { main: "#66E0FF", light: "#8EEBFF", dark: "#2CBFD8" },
        success: { main: "#3DD9A3", light: "#62E6B8", dark: "#21B782" },
        warning: { main: "#FFC55C", light: "#FFD789", dark: "#E2A231" },
        error: { main: "#FF7A90", light: "#FF97A7", dark: "#D8586F" },
        background: { default: "#0B1020", paper: "#101728" },
        text: { primary: "#E5E7EB", secondary: "#A7B0C0" },
        divider: "#25314E",
      },
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: [
      "InterVar, Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ].join(","),
    button: { textTransform: "none", letterSpacing: 0.2 },
  },
});

// Enhance with component-specific modern UI touches
export const theme = createTheme(baseTheme, {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: baseTheme.shape.borderRadius,
          backgroundImage: "none",
        },
        outlined: {
          backdropFilter: "saturate(180%) blur(10px)",
        },
      },
      defaultProps: {
        elevation: 0,
        variant: "outlined",
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: baseTheme.shape.borderRadius,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: Number(baseTheme.shape.borderRadius) + 2,
          transition: baseTheme.transitions.create(["transform", "box-shadow"], {
            duration: baseTheme.transitions.duration.shortest,
          }),
        },
      },
      defaultProps: {
        elevation: 0,
        variant: "outlined",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: "medium",
      },
      styleOverrides: {
        root: {
          borderRadius: Number(baseTheme.shape.borderRadius) - 4,
        },
        contained: {
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          backdropFilter: "saturate(180%) blur(8px)",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});
