import { useState } from "react";
import { CardType } from "@/types/card";
import { useCards } from "@hooks/useCards";
import { useAuth } from "@/auth";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { AccountAvatar } from "@components/Account/AccountAvatar";
import { CardFields } from "@components/Card/ui/CardFields";

export const Card = (props: { card: CardType }) => {
  const { card } = props;
  const { nominations, suggestions } = card.data;
  const { removeCardMutation } = useCards();
  const { isAuthenticated } = useAuth();

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = () => {
    removeCardMutation.mutateAsync(props.card.id).catch(() => {
      setErrorMessage("Невозможно удалить чужие итоги");
      setErrorOpen(true);
    });
  };

  const handleClose = () => setErrorOpen(false);

  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const cols = downSm ? 1 : downMd ? 2 : 3;

  return (
    <Box
      sx={{
        borderRadius: 3,
        transition: (theme) =>
          theme.transitions.create(["box-shadow", "transform"], {
            duration: theme.transitions.duration.shorter,
          }),
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <AccountAvatar user={card.user} />
        {isAuthenticated() && (
          <Tooltip title="Удалить итог">
            <IconButton color="error" onClick={handleDelete} aria-label="Удалить итог" size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <ImageList variant="masonry" cols={cols} gap={8} sx={{ m: 0, overflow: "visible" }}>
        {nominations.map((field) => (
          <ImageListItem key={field.id}>
            <CardFields field={field} />
          </ImageListItem>
        ))}
      </ImageList>

      {suggestions.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <ImageList variant="masonry" cols={cols} gap={6} sx={{ m: 0, overflow: "visible" }}>
            {suggestions.map((field) => (
              <ImageListItem key={field.id}>
                <CardFields field={field} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}

      <Snackbar
        open={errorOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          Ошибка: {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
