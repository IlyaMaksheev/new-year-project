import { Paper } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

export const NavBarContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  width: "100%",
  padding: theme.spacing(1.5, 2),
  // borderRadius: theme.shape.borderRadius * 1.5,
  // backdropFilter: "saturate(180%) blur(8px)",
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
}));
