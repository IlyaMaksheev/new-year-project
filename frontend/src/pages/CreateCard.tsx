import { useNavigate } from "@tanstack/react-router";
import { ChangeEvent } from "react";
import { useCreateCard } from "../hooks/useCreateCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { NominationList } from "@components/Nomination/NominationList.tsx";
import { SuggestionsList } from "@components/Suggestions/SuggestionsList.tsx";

export const CreateCards = () => {
  const { createCardMutation } = useCreateCard();
  const theme = useTheme();
  const buttonColor: "primary" | "secondary" =
    theme.palette.mode === "light" ? "primary" : "secondary";

  const navigate = useNavigate({ from: "/cards/create" });

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCardMutation.mutateAsync().then(() => navigate({ to: "/cards" }));
  };

  return (
    <Box
      sx={{
        py: { xs: 2, md: 4 },
        my: 2,
        mx: 4,
      }}
    >
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
                Создать номинации
              </Typography>
              <Typography variant="body2" color="text.secondary" pl={{ xs: 0, sm: "5px" }}>
                Добавьте номинации и предложения. Вы сможете редактировать их позже.
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color={buttonColor}
              sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
            >
              {createCardMutation.isPending ? "Сохраняется ..." : "Сохранить"}
            </Button>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <NominationList />
          </Box>
          <Box sx={{ mt: 3 }}>
            <SuggestionsList />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
