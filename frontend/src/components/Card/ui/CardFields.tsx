import { FC, useRef, useState, type ChangeEvent } from "react";
import type { CardDataFieldType, CardFieldsType } from "@/types/card";
import { Stack, Typography, TextField } from "@mui/material";
import {
  CardContainer,
  Title,
  Subtitle,
  CardImage,
  ImagePlaceholder,
  StyledDivider,
  StyledDialog,
  StyledDialogContent,
  DialogImageContainer,
  DialogImage,
  ImageWrapper,
  EditOverlayButton,
} from "./styled";
import EditIcon from "@mui/icons-material/Edit";
import { useAddImageToCard } from "@api/cards.ts";

interface CardFieldsProps {
  field: CardFieldsType;
  isEditing: boolean;
  isSuggest?: boolean;
  cardId: number;
  // Controlled values for editing
  //TODO перейти на react hook form
  titleValue?: string;
  subtitleValue?: string;
  descriptionValue?: string;
  // Change handlers
  onChangeTitle?: (value: string) => void;
  onChangeSubtitle?: (value: string) => void;
  onChangeDescription?: (value: string) => void;
}

export const CardFields: FC<CardFieldsProps> = ({
  field,
  isEditing,
  isSuggest,
  cardId,
  titleValue,
  subtitleValue,
  descriptionValue,
  onChangeTitle,
  onChangeSubtitle,
  onChangeDescription,
}) => {
  const [open, setOpen] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const addImageToCard = useAddImageToCard();

  const handleOpen = () => {
    if (isEditing) {
      return;
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handlePickImage = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optimistic preview
    const url = URL.createObjectURL(file);
    setLocalPreview(url);

    try {
      await addImageToCard({
        card_id: cardId,
        data_id: field.id,
        card_data_type: isSuggest ? "suggestions" : "nominations",
        image_file: file,
      } as any);
    } finally {
      // keep preview; real image_url will arrive after refetch
    }
  };

  const displayedImage = localPreview || field.image_url;

  const altText = field.title || field.subtitle || "Изображение";
  const hasImage = Boolean(displayedImage);
  const isEditTitles = isSuggest && isEditing;

  return (
    <CardContainer elevation={4}>
      <Stack spacing={1.5}>
        <Stack spacing={0.5}>
          {isEditTitles ? (
            <>
              <TextField
                placeholder={"Заголовок"}
                value={titleValue ?? field.title ?? ""}
                onChange={(e) => onChangeTitle?.(e.target.value)}
              />
              <TextField
                placeholder={"Подзаголовок"}
                value={subtitleValue ?? field.subtitle ?? ""}
                onChange={(e) => onChangeSubtitle?.(e.target.value)}
              />
            </>
          ) : (
            <>
              <Title variant="h6">{field.title}</Title>
              <Subtitle variant="body1">{field.subtitle}</Subtitle>
            </>
          )}
        </Stack>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {hasImage ? (
          <ImageWrapper>
            <CardImage
              src={displayedImage}
              alt={altText}
              onClick={isEditing ? handlePickImage : handleOpen}
              $isEditing={isEditing}
            />
            {isEditing && (
              <EditOverlayButton
                aria-label="Редактировать изображение"
                size="large"
                onClick={handlePickImage}
              >
                <EditIcon />
              </EditOverlayButton>
            )}
          </ImageWrapper>
        ) : (
          <ImagePlaceholder onClick={isEditing ? handlePickImage : undefined}>
            Нет изображения
          </ImagePlaceholder>
        )}

        {isEditing ? (
          <>
            <StyledDivider />
            <TextField
              placeholder={"Описание"}
              multiline
              fullWidth
              value={descriptionValue ?? field.description ?? ""}
              onChange={(e) => onChangeDescription?.(e.target.value)}
            />
          </>
        ) : (
          <>
            {field.description && (
              <>
                <StyledDivider />
                <Typography variant="body2" color="text.secondary">
                  {field.description}
                </Typography>
              </>
            )}
          </>
        )}

        {hasImage && (
          <StyledDialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            aria-labelledby="image-dialog-title"
          >
            <StyledDialogContent>
              <DialogImageContainer onClick={handleClose}>
                <DialogImage src={displayedImage} alt={altText} />
              </DialogImageContainer>
            </StyledDialogContent>
          </StyledDialog>
        )}
      </Stack>
    </CardContainer>
  );
};
