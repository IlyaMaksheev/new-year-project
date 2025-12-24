import { styled } from "@mui/material/styles";
import { Box, Dialog, DialogContent, Divider, Paper, Typography, IconButton } from "@mui/material";

export const CardContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 512,
  width: "100%",
  padding: theme.spacing(2.5),
  borderRadius: Number(theme.shape.borderRadius) * 3,
  overflow: "hidden",
  // Glassmorphism / liquid glass styles
  backgroundColor:
    theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.35)" : "rgba(17, 25, 40, 0.55)",
  backgroundImage:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 60%)"
      : "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%)",
  backdropFilter: "blur(16px) saturate(140%)",
  WebkitBackdropFilter: "blur(16px) saturate(140%)",
  border:
    theme.palette.mode === "light"
      ? "1px solid rgba(255, 255, 255, 0.6)"
      : "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow: "0 10px 30px rgba(2, 8, 20, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
  transition: theme.transitions.create(["box-shadow", "transform"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 14px 40px rgba(2, 8, 20, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
  },
}));

export const Title = styled(Typography)({
  flexGrow: 1,
});

export const Subtitle = styled(Typography)({
  flexGrow: 1,
});

interface CardImageProps {
  $isEditing?: boolean;
}

export const CardImage = styled("img", {
  shouldForwardProp: (prop) => prop !== "$isEditing",
})<CardImageProps>(({ theme, $isEditing }) => ({
  width: "100%",
  objectFit: "cover",
  borderRadius: Number(theme.shape.borderRadius) * 2,
  boxShadow: theme.shadows[1] as string,
  cursor: $isEditing ? "default" : "zoom-in",
  filter: $isEditing ? "brightness(0.6)" : "none",
  transition: theme.transitions.create(["filter", "transform", "box-shadow"], {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const ImagePlaceholder = styled(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: Number(theme.shape.borderRadius) * 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800],
  color: theme.palette.text.secondary,
  ...theme.typography.caption,
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

export const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.85)",
}));

export const DialogImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "90vw",
  maxHeight: "90vh",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[5] as string,
  cursor: "zoom-out",
}));

export const DialogImage = styled("img")(() => ({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
  objectFit: "contain",
  display: "block",
}));

export const ImageWrapper = styled(Box)(() => ({
  position: "relative",
}));

export const EditOverlayButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: theme.shadows[1] as string,
}));
