import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavBarContainer, NavBarStickyWrapper } from "./ui/styled.ts";
import { AuthorisationLinks } from "./ui/AuthorisationLinks.tsx";
import { MenuItem } from "./ui/MenuItem.tsx";

export const NavHeader = () => {
  return (
    <NavBarStickyWrapper component="header">
      <Container maxWidth="lg">
        <NavBarContainer elevation={8}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <MenuItem to="/cards">Итоги</MenuItem>
            <MenuItem to="/templates">Шаблоны</MenuItem>
          </Box>
          <AuthorisationLinks />
        </NavBarContainer>
      </Container>
    </NavBarStickyWrapper>
  );
};
