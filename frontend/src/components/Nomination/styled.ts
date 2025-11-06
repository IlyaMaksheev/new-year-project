import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ClipboardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: 60,
  border: "1px dashed",
  borderColor: "divider",
  borderRadius: 1,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  transition:
    "border-color .2s ease, box-shadow .2s ease, background-color .2s ease, transform .05s ease",
  "&:active": {
    transform: "scale(0.995)",
  },
  "&:focus-visible": {
    outline: "none",
    borderColor: "primary.main",
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}`,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const DropZoneBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 100,
  border: "1px dashed",
  borderColor: "divider",
  borderRadius: 8,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  transition:
    "border-color .2s ease, box-shadow .2s ease, background-color .2s ease, transform .05s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:focus-visible": {
    outline: "none",
    borderColor: "primary.main",
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}`,
    backgroundColor: theme.palette.action.hover,
  },
}));
