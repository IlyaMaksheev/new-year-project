import { useCreateCard } from "@hooks/useCreateCard.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { CreateSuggestion } from "@components/Suggestions/CreateSuggestion.tsx";

export const CreateSuggestionList = () => {
  const { createCard, addSuggestionField } = useCreateCard();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" pl={{ xs: 0, sm: "5px" }}>
        Предложения
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {createCard ? (
          createCard.card_suggestions_data.map((value, index) => (
            <Grid key={index}>
              <CreateSuggestion structure={{ ...value, index }} />
            </Grid>
          ))
        ) : (
          <Grid>
            <Typography color="text.secondary">Нет элементов</Typography>
          </Grid>
        )}
        <Grid>
          <Box
            onClick={addSuggestionField}
            role="button"
            tabIndex={0}
            sx={{
              height: 360,
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
            <Stack direction="row" spacing={1} alignItems="center" p={4}>
              <AddIcon />
              <Typography variant="body1">Добавить предложение</Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
