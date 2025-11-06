import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
// @ts-expect-error
import mainLogo from "../../../../assets/loho.png";

export const Logo = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Box component="img" sx={{ width: 40, height: 40 }} src={mainLogo} alt="Logo" />
    </Box>
  );
};
