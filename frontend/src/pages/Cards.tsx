import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { useCards } from "@hooks/useCards";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Card } from "@components/Card/Card";
import { useTheme } from "@mui/material";

const CardsList = () => {
  const { useCardsQuery } = useCards();

  const { data, status, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useCardsQuery();

  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [entry, inView, fetchNextPage]);

  if (status === "pending") {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i}>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (status === "error") {
    return (
      <Alert severity="error" variant="outlined">
        {error instanceof Error ? error.message : "Не удалось загрузить итоги."}
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      {data.length > 0 ? (
        data.map((value, idx) => (
          <Grid key={value.id}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.3) }}
            >
              <Card card={value} />
            </motion.div>
          </Grid>
        ))
      ) : (
        <Grid>
          <Alert severity="info" variant="outlined" sx={{ mt: 4 }}>
            Итоги года не подведены, создайте шаблон и заполните его.
          </Alert>
        </Grid>
      )}
      <Grid>
        <Box
          ref={ref}
          sx={{
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            typography: "caption",
          }}
        >
          {!hasNextPage && data.length > 0 && "Больше данных нет"}
          {isFetchingNextPage && "Загружаем ещё..."}
        </Box>
      </Grid>
    </Grid>
  );
};

export const Cards = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box>
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
        <Typography variant="h4" component="h1" gutterBottom>
          Итоги
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ваши подведённые итоги за год
        </Typography>
      </Box>
      <Paper
        elevation={8}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          mx: 4,
          my: 2,
          backdropFilter: "saturate(180%) blur(8px)",
        }}
      >
        <Stack spacing={3}>
          <CardsList />
        </Stack>
      </Paper>
    </Box>
  );
};
