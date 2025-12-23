import { useCreateTemplate } from "@hooks/useCreateTemplates.ts";
import { useNavigate } from "@tanstack/react-router";
import { ChangeEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid, Typography, Paper, Stack } from "@mui/material";
import { TemplateNomination } from "@components/Nomination/TemplateNomination.tsx";
import AddIcon from "@mui/icons-material/Add";

export const CreateTemplateForm = () => {
  const { template, addTemplateField, createCardsTemplateMutation } = useCreateTemplate();

  const navigate = useNavigate({ from: "/templates/create" });

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCardsTemplateMutation
      .mutateAsync(template)
      .then(() => navigate({ to: "/templates" }));
  };

  const theme = useTheme();
  const buttonColor: "primary" | "secondary" =
    theme.palette.mode === "light" ? "primary" : "secondary";

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
      <form onSubmit={handleOnSubmit}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h4" pl={{ xs: 0, sm: "5px" }}>
              Создать шаблон
            </Typography>
            <Typography variant="body2" color="text.secondary" pl={{ xs: 0, sm: "5px" }}>
              Добавьте одну или больше номинаций. Вы сможете редактировать их позже.
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color={buttonColor}
            sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
          >
            {createCardsTemplateMutation.isPending ? "Создается ..." : "Создать"}
          </Button>
        </Stack>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {template.map((templateField, index) => (
            <Grid key={index}>
              <TemplateNomination templateField={templateField} index={index} />
            </Grid>
          ))}
          <Grid>
            <Box
              onClick={addTemplateField}
              role="button"
              tabIndex={0}
              sx={{
                minHeight: { xs: 120, sm: 160, md: 180 },
                border: (theme) => `2px dashed ${theme.palette.divider}`,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                cursor: "pointer",
                transition: "all .2s ease",
                outline: "none",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" p={{ xs: 1, sm: 1.5, md: 2 }}>
                <AddIcon />
                <Typography variant="body1">Добавить номинацию</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
