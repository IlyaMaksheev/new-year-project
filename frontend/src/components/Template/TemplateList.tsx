import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth.tsx";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
  Stack,
  Tooltip,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import { useSetAtom } from "jotai";
import { createCardAtom } from "@state/atoms.ts";
import { useCardsTemplates } from "@hooks/useCardsTemplates.ts";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { AccountAvatar } from "@components/Account/AccountAvatar.tsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { TemplateField } from "@components/Template/TemplateField.tsx";

export const TemplatesList = () => {
  const navigate = useNavigate({ from: "/templates" });

  const { isAuthenticated } = useAuth();

  const [errorOpen, setErrorOpen] = useState(false);

  const setCreateAtom = useSetAtom(createCardAtom);

  const { useCardsTemplatesQuery, cardsTemplatesRemoveMutation } = useCardsTemplates();

  const { data, status, error, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useCardsTemplatesQuery();

  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [entry, inView, fetchNextPage]);

  if (status === "pending") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "error") {
    return (
      <>
        <h1>Error:</h1>
        <p>{JSON.stringify(error)}</p>
      </>
    );
  }

  const handleRemoveTemplate = (templateId: number) => {
    cardsTemplatesRemoveMutation.mutateAsync(templateId).catch(() => {
      setErrorOpen(true);
    });
  };

  const handleCreateTemplate = (templateId: number) => {
    const item = data?.find((item) => item.id === templateId);
    if (item === undefined || item === null) {
      return;
    }
    setCreateAtom({
      card_template_id: item.id,
      card_nominations_data: item.structure.map((structure) => {
        return { ...structure, description: "" };
      }),
      card_suggestions_data: [],
    });
    navigate({ to: "/cards/create" });
  };

  if (data?.length === 0) {
    return (
      <Box px={{ xs: 2, sm: 3, md: 4 }}>
        <Alert severity="info" sx={{ mt: 4 }}>
          Создайте шаблон, чтобы подвести итоги.
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box px={{ xs: 2, sm: 3, md: 4 }}>
        <Grid spacing={3}>
          {data?.map((cardTemplate) => (
            <Grid key={cardTemplate.id}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light" ? "#fff" : "rgba(255,255,255,0.03)",
                  borderColor: (theme) =>
                    theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
                  transition: "all .2s ease",
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <AccountAvatar user={cardTemplate.user} />
                  {isAuthenticated() && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Button
                        onClick={() => handleCreateTemplate(cardTemplate.id)}
                        variant="contained"
                        color="primary"
                        startIcon={<ContentPasteGoIcon />}
                        size="small"
                      >
                        Заполнить
                      </Button>
                      <Tooltip title="Удалить шаблон">
                        <IconButton
                          aria-label="Удалить шаблон"
                          onClick={() => handleRemoveTemplate(cardTemplate.id)}
                          size="small"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={1.5}>
                  {cardTemplate.structure.map((structure, index) => (
                    <Grid key={index}>
                      <TemplateField structure={structure} />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box ref={ref} display="flex" justifyContent="center" alignItems="center" py={3}>
          {isFetchingNextPage && (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Загрузка...
              </Typography>
            </Stack>
          )}
          {!hasNextPage && (
            <Typography variant="body2" color="text.secondary">
              Это все шаблоны
            </Typography>
          )}
        </Box>
      </Box>

      <Snackbar
        open={errorOpen}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          setErrorOpen(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Невозможно удалить чужой шаблон
        </Alert>
      </Snackbar>
    </>
  );
};
