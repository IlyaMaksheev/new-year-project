import { TemplateStructureType } from "@/types/cardTemplate.ts";
import { useCreateTemplate } from "@hooks/useCreateTemplates.ts";
import { Box, Card, CardContent, TextField, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const TemplateNomination = ({
  templateField,
  index,
}: {
  templateField: TemplateStructureType;
  index: number;
}) => {
  const { removeTemplateStructure, changeTemplateStructure } = useCreateTemplate();

  return (
    <Box mt={1}>
      <Card
        elevation={2}
        sx={{
          width: "100%",
          borderRadius: 2,
          transition: "box-shadow .2s ease, transform .05s ease",
        }}
      >
        <CardContent>
          <Box display="flex" gap={2} alignItems="flex-start">
            <TextField
              fullWidth
              label="Заголовок"
              placeholder="Например: Игра года"
              id="title"
              name="title"
              type="text"
              value={templateField.title}
              onChange={(event) =>
                changeTemplateStructure(index, event.target.name, event.target.value)
              }
            />
            <Tooltip title="Удалить номинацию">
              <IconButton
                aria-label="Удалить"
                onClick={() => removeTemplateStructure(index)}
                size="large"
                sx={{ mt: 0.5 }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Краткое описание"
            placeholder="Краткое описание"
            id="subtitle"
            name="subtitle"
            type="text"
            value={templateField.subtitle}
            onChange={(event) =>
              changeTemplateStructure(index, event.target.name, event.target.value)
            }
          />
        </CardContent>
      </Card>
    </Box>
  );
};
