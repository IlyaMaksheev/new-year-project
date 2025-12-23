import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";

export const NavBarContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  width: "100%",
  padding: theme.spacing(1.25, 1.5),
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "saturate(120%) blur(8px)",
  WebkitBackdropFilter: "saturate(120%) blur(8px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(1.5, 2),
  },
}));

export const NavBarStickyWrapper = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.appBar,
  paddingTop: theme.spacing(1),
  // Safe area for iOS notches
  paddingLeft: "env(safe-area-inset-left)",
  paddingRight: "env(safe-area-inset-right)",
})) as typeof Box;
