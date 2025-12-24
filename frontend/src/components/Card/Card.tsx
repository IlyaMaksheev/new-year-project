import { useState } from "react";
import { CardType } from "@/types/card";
import { useCards } from "@hooks/useCards";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AccountAvatar } from "@components/Account/AccountAvatar";
import { CardFields } from "@components/Card/ui/CardFields";
import { CardActions } from "@components/Card/ui/CardActions.tsx";
import { useEditCards } from "@hooks/useEditCards.ts";
import { useFetchMeQuery } from "@hooks/useFetchMeQuery.ts";

export const Card = (props: { card: CardType }) => {
  const { card } = props;
  const { nominations, suggestions } = card.data;
  const { removeCardMutation } = useCards();
  const saveCardQuery = useEditCards();
  const meQuery = useFetchMeQuery();
  const isEditEnable = meQuery.data?.id === card.user.id;
  const [isEditing, setIsEditing] = useState(false);

  // Local editable state
  const [editedNominations, setEditedNominations] = useState<
    Record<number, { description: string }>
  >({});
  const [editedSuggestions, setEditedSuggestions] = useState<
    Record<number, { title: string; subtitle: string; description: string }>
  >({});

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = () => {
    removeCardMutation.mutateAsync(props.card.id).catch(() => {
      setErrorMessage("Невозможно удалить чужие итоги");
      setErrorOpen(true);
    });
  };

  const handleEditCard = () => {
    // Initialize editable values from current card data
    const initNoms: Record<number, { description: string }> = {};
    nominations.forEach((n) => {
      initNoms[n.id] = { description: n.description ?? "" } as any;
    });
    const initSugs: Record<number, { title: string; subtitle: string; description: string }> = {};
    suggestions.forEach((s) => {
      initSugs[s.id] = {
        title: s.title ?? "",
        subtitle: s.subtitle ?? "",
        description: s.description ?? "",
      } as any;
    });
    setEditedNominations(initNoms);
    setEditedSuggestions(initSugs);
    setIsEditing(true);
  };

  const handleSaveCard = async () => {
    // Build payload from edited state (fall back to original values if missing)
    const card_nominations_data = nominations.map((n) => ({
      description: (editedNominations[n.id]?.description ?? n.description ?? "").trim() || null,
    }));
    const card_suggestions_data = suggestions.map((s) => ({
      title: (editedSuggestions[s.id]?.title ?? s.title ?? "").trim() || null,
      subtitle: (editedSuggestions[s.id]?.subtitle ?? s.subtitle ?? "").trim() || null,
      description: (editedSuggestions[s.id]?.description ?? s.description ?? "").trim() || null,
    }));

    saveCardQuery.mutate(
      {
        cardId: card.id,
        template_id: card.template_id!,
        card_template_id: card.template_id!,
        card_nominations_data,
        card_suggestions_data,
      } as any,
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: () => {
          setErrorMessage("Не удалось сохранить изменения");
          setErrorOpen(true);
        },
      },
    );
  };

  const handleClose = () => setErrorOpen(false);

  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const up2k = useMediaQuery("(min-width:2000px)");
  const cols = downSm ? 1 : downMd ? 2 : up2k ? 4 : 3;

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
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <AccountAvatar user={card.user} />
        {isEditEnable && (
          <CardActions
            handleEditCard={handleEditCard}
            handleSaveCard={handleSaveCard}
            handleDelete={handleDelete}
            isEditing={isEditing}
          />
        )}
      </Stack>

      <ImageList variant="masonry" cols={cols} gap={8} sx={{ m: 0, overflow: "visible" }}>
        {nominations.map((field) => (
          <ImageListItem key={field.id}>
            <CardFields
              field={field}
              isEditing={isEditing}
              cardId={card.id}
              descriptionValue={editedNominations[field.id]?.description ?? field.description ?? ""}
              onChangeDescription={(val) =>
                setEditedNominations((prev) => ({ ...prev, [field.id]: { description: val } }))
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      {suggestions.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <ImageList variant="masonry" cols={cols} gap={6} sx={{ m: 0, overflow: "visible" }}>
            {suggestions.map((field) => (
              <ImageListItem key={field.id}>
                <CardFields
                  field={field}
                  isEditing={isEditing}
                  isSuggest={true}
                  cardId={card.id}
                  titleValue={editedSuggestions[field.id]?.title ?? field.title ?? ""}
                  subtitleValue={editedSuggestions[field.id]?.subtitle ?? field.subtitle ?? ""}
                  descriptionValue={
                    editedSuggestions[field.id]?.description ?? field.description ?? ""
                  }
                  onChangeTitle={(val) =>
                    setEditedSuggestions((prev) => ({
                      ...prev,
                      [field.id]: {
                        title: val,
                        subtitle: prev[field.id]?.subtitle ?? field.subtitle ?? "",
                        description: prev[field.id]?.description ?? field.description ?? "",
                      },
                    }))
                  }
                  onChangeSubtitle={(val) =>
                    setEditedSuggestions((prev) => ({
                      ...prev,
                      [field.id]: {
                        title: prev[field.id]?.title ?? field.title ?? "",
                        subtitle: val,
                        description: prev[field.id]?.description ?? field.description ?? "",
                      },
                    }))
                  }
                  onChangeDescription={(val) =>
                    setEditedSuggestions((prev) => ({
                      ...prev,
                      [field.id]: {
                        title: prev[field.id]?.title ?? field.title ?? "",
                        subtitle: prev[field.id]?.subtitle ?? field.subtitle ?? "",
                        description: val,
                      },
                    }))
                  }
                />
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
