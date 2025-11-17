import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FancyTitleContainer = styled(Box)(({ theme }) => ({
  marginInline: "32px",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: "42px",
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(16,185,129,0.08))"
      : "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(16,185,129,0.12))",
  border:
    theme.palette.mode === "light"
      ? "1px solid rgba(0,0,0,0.06)"
      : "1px solid rgba(255,255,255,0.08)",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));
