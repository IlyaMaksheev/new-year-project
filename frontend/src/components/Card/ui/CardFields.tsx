import { useState } from "react";
import type { CardFieldsType } from "@/types/card";
import { Box, Dialog, DialogContent, Divider, Paper, Stack, Typography } from "@mui/material";

export const CardFields = (props: { field: CardFieldsType }) => {
  const { field } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const altText = field.title || field.subtitle || "Изображение";
  const hasImage = Boolean(field.image_url);

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 512,
        width: "100%",
        p: 2.5,
        borderRadius: 3,
        overflow: "hidden",
        // Glassmorphism / liquid glass styles
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.35)"
            : "rgba(17, 25, 40, 0.55)",
        backgroundImage: (theme) =>
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 60%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        border: (theme) =>
          theme.palette.mode === "light"
            ? "1px solid rgba(255, 255, 255, 0.6)"
            : "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow:
          "0 10px 30px rgba(2, 8, 20, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        transition: (theme) =>
          theme.transitions.create(["box-shadow", "transform"], {
            duration: theme.transitions.duration.shorter,
          }),
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow:
            "0 14px 40px rgba(2, 8, 20, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
        },
      }}
    >
      <Stack spacing={1.5}>
        <Stack spacing={0.5}>
          <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
            {field.title}
          </Typography>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {field.subtitle}
          </Typography>
        </Stack>

        {hasImage ? (
          <Box
            component="img"
            src={field.image_url}
            alt={altText}
            onClick={handleOpen}
            sx={{
              width: "100%",
              aspectRatio: "4 / 3",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: (theme) => theme.shadows[1],
              cursor: "zoom-in",
              transition: (theme) =>
                theme.transitions.create(["transform", "box-shadow"], {
                  duration: theme.transitions.duration.shortest,
                }),
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => (theme.palette.mode === "light" ? "grey.100" : "grey.800"),
              color: "text.secondary",
              typography: "caption",
            }}
          >
            Нет изображения
          </Box>
        )}

        {field.description && (
          <>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {field.description}
            </Typography>
          </>
        )}

        {hasImage && (
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            aria-labelledby="image-dialog-title"
            PaperProps={{
              sx: {
                bgcolor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <DialogContent
              sx={{
                p: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0,0,0,0.85)",
              }}
            >
              <Box
                onClick={handleClose}
                sx={{
                  position: "relative",
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: (theme) => theme.shadows[5],
                  cursor: "zoom-out",
                }}
              >
                <Box
                  component="img"
                  src={field.image_url}
                  alt={altText}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Stack>
    </Paper>
  );
};
