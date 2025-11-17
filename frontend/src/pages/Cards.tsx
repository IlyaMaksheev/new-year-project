import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { useCards } from "@hooks/useCards";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Card } from "@components/Card/Card";

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
              <Paper
                elevation={8}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  mx: 4,
                }}
              >
                <Card card={value} />
              </Paper>
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
  return (
    <Box sx={{ mt: 4 }}>
      <CardsList />
    </Box>
  );
};
