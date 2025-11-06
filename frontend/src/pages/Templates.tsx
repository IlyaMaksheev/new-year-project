import { Link } from "@tanstack/react-router";
import { useAuth } from "../auth";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TemplatesList } from "@components/Template/TemplateList.tsx";

export const Templates = () => {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const buttonColor: "primary" | "warning" = isLight ? "primary" : "warning";

  return (
    <>
      <Box
        sx={{
          mx: "32px",
          mt: 2,
          mb: 4,
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          background: isLight
            ? "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(16,185,129,0.08))"
            : "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(16,185,129,0.12))",
          border:
            theme.palette.mode === "light"
              ? "1px solid rgba(0,0,0,0.06)"
              : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Шаблоны
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Создавайте и делитесь шаблонами для подведения итогов. Выберите готовый или начните с
              нуля.
            </Typography>
          </Box>
          {isAuthenticated() && (
            <Link to="/templates/create">
              <Button
                size="small"
                startIcon={<AddIcon />}
                variant="contained"
                color={buttonColor}
                sx={{ alignSelf: { xs: "stretch", md: "center" } }}
              >
                Создать шаблон
              </Button>
            </Link>
          )}
        </Stack>
      </Box>
      <TemplatesList />
    </>
  );
};
