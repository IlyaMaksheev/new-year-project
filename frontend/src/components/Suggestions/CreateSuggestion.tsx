import { FieldProps } from "@/types/nominations.ts";
import { useCreateCard } from "@hooks/useCreateCard.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { ClipboardBox, DropZoneBox } from "@components/Nomination/styled.ts";
import { useImagePicker } from "@hooks/useImagePicker.ts";

export const CreateSuggestion = (props: { structure: FieldProps }) => {
  const { changeCreateCard, removeSuggestionField } = useCreateCard();

  const {
    preview,
    isDragging,
    inputRef,
    handleImageFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handlePasteImage,
  } = useImagePicker(props.structure.index, "suggestions");

  return (
    <Card
      elevation={2}
      sx={{
        width: "100%",
        borderRadius: 2,
        transition: "box-shadow .2s ease, transform .05s ease",
        position: "relative",
      }}
    >
      {preview && (
        <Box
          component="img"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 1,
            opacity: 0.2,
            zIndex: 0,
            pointerEvents: "none",
          }}
          alt="Изображение превью"
          src={preview}
        />
      )}
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 1 }}>
              <Tooltip title="Удалить предложение">
                <IconButton
                  aria-label="Удалить предложение"
                  onClick={() => removeSuggestionField(props.structure.index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              type="text"
              label="Заголовок"
              placeholder="Например: Фильм года"
              name="title"
              value={props.structure.title}
              onChange={(event) =>
                changeCreateCard(
                  "card_suggestions_data",
                  props.structure.index,
                  "title",
                  event.target.value,
                )
              }
              fullWidth
            />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Перетащите изображение сюда или кликните для выбора файла
            </Typography>
            <DropZoneBox
              onClick={() => inputRef.current?.click()}
              onDrop={(e) => handleDrop(e)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              tabIndex={0}
              role="button"
              aria-label="Зона для загрузки изображения (перетащите или кликните)"
              title="Перетащите изображение или кликните, чтобы выбрать файл"
              sx={{
                borderColor: isDragging ? "primary.main" : undefined,
                marginBottom: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {isDragging
                  ? "Отпустите файл для загрузки"
                  : "Перетащите изображение сюда или нажмите, чтобы выбрать файл"}
              </Typography>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageFile(e)}
              />
            </DropZoneBox>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
              Вставить из буфера обмена
            </Typography>
            <ClipboardBox
              onPaste={(e) => handlePasteImage(e)}
              tabIndex={0}
              role="button"
              aria-label="Зона для вставки изображения из буфера обмена"
              title="Фокусируйте и нажмите Ctrl+V / Cmd+V, чтобы вставить изображение"
            >
              <Typography variant="body2" color="text.secondary">
                Нажмите сюда и используйте Ctrl+V / Cmd+V для вставки изображения
              </Typography>
            </ClipboardBox>
          </Box>
          <Box>
            <TextField
              type="text"
              label="Подзаголовок"
              placeholder="Короткий подзаголовок к предложению"
              name="subtitle"
              value={props.structure.subtitle}
              onChange={(event) =>
                changeCreateCard(
                  "card_suggestions_data",
                  props.structure.index,
                  "subtitle",
                  event.target.value,
                )
              }
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              label="Описание"
              placeholder="Детали и пояснения"
              name="description"
              value={props.structure.description}
              onChange={(event) =>
                changeCreateCard(
                  "card_suggestions_data",
                  props.structure.index,
                  "description",
                  event.target.value,
                )
              }
              multiline
              fullWidth
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
