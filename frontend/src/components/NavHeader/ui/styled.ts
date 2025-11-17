import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";

export const NavBarContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  width: "100%",
  padding: theme.spacing(1.5, 2),
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
}));

export const NavBarStickyWrapper = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.appBar,
  paddingTop: theme.spacing(1),
})) as typeof Box;
