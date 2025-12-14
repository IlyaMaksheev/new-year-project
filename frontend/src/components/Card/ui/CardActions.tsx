import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { useAuth } from "@/auth.tsx";

interface CardActionsProps {
  isEditing: boolean;
  handleEditCard: () => void;
  handleSaveCard: () => void;
  handleDelete: () => void;
}

export const CardActions: FC<CardActionsProps> = ({
  isEditing,
  handleEditCard,
  handleSaveCard,
  handleDelete,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated() && (
      <Box>
        {!isEditing && (
          <Tooltip title="Редактировать итог">
            <IconButton onClick={handleEditCard} aria-label="Редактировать итог" size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {isEditing && (
          <Tooltip title="Сохранить итог">
            <IconButton onClick={handleSaveCard} aria-label="Сохранить итог" size="small">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Удалить итог">
          <IconButton color="error" onClick={handleDelete} aria-label="Удалить итог" size="small">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    )
  );
};
