import { useCreateCard } from "@hooks/useCreateCard.ts";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CreateNomination } from "@components/Nomination/CreateNomination.tsx";

export const CreateNominationList = () => {
  const { createCard } = useCreateCard();

  return (
    <Box>
      <Grid container spacing={2}>
        {createCard ? (
          createCard.card_nominations_data.map((value, index) => (
            <Grid key={index}>
              <CreateNomination structure={{ ...value, index }} />
            </Grid>
          ))
        ) : (
          <Grid>
            <Typography color="text.secondary">Нет элементов</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
