import { TemplateStructureType } from "@/types/cardTemplate.ts";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

export const TemplateField = (props: { structure: TemplateStructureType }) => {
  const { structure } = props;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        transition: "all .2s ease",
        borderColor: (theme) =>
          theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#fff" : "rgba(255,255,255,0.03)",
      }}
    >
      <CardContent>
        <Stack divider={<Divider />} spacing={1.5}>
          <Typography variant="subtitle1" component="h3" fontWeight={600}>
            {structure.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {structure.subtitle}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
