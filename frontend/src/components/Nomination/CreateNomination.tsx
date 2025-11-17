import { useCreateCard } from "@hooks/useCreateCard.ts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FieldProps } from "@/types/nominations.ts";
import { ClipboardBox, DropZoneBox } from "@components/Nomination/styled.ts";
import { useImagePicker } from "@hooks/useImagePicker.ts";

export const CreateNomination = (props: { structure: FieldProps }) => {
  const { changeCreateCard } = useCreateCard();
  const {
    preview,
    isDragging,
    inputRef,
    handleImageFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handlePasteImage,
  } = useImagePicker(props.structure.index, "nominations");

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
            pointerEvents: "none",
          }}
          alt="Изображение превью"
          src={preview}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardHeader title={props.structure.title} subheader={props.structure.subtitle} />
      </Box>
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 0.5 }}
              >
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
                }}
              >
                <Typography variant="body2" color="text.secondary">
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
            </Box>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 0.5 }}
              >
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
          </Stack>
          <Box>
            <TextField
              label="Описание"
              placeholder="Короткое описание или комментарий"
              inputProps={{ maxLength: 500 }}
              name="description"
              value={props.structure.description}
              onChange={(event) =>
                changeCreateCard(
                  "card_nominations_data",
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
