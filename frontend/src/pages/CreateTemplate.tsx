import { Box } from "@mui/material";
import { CreateTemplateForm } from "@components/Nomination/CreateTemplateForm.tsx";

export const CreateTemplate = () => {
  return (
    <Box
      sx={{
        py: { xs: 2, md: 4 },
        mx: 4,
        my: 2,
      }}
    >
      <CreateTemplateForm />
    </Box>
  );
};
