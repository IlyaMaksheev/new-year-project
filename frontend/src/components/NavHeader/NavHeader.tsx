import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { CloseIcon } from "./ui/assets/CloseIcon.tsx";
import { MenuIcon } from "./ui/assets/MenuIcon.tsx";
import { NavBarContainer } from "./ui/styled.ts";
import { AuthorisationLinks } from "./ui/AuthorisationLinks.tsx";
import { MenuItem } from "./ui/MenuItem.tsx";

const MenuToggle = ({ toggle, isOpen }: { toggle(): void; isOpen: boolean }) => {
  return (
    <IconButton
      onClick={toggle}
      sx={{ display: { xs: "inline-flex", md: "none" } }}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  );
};

export const NavHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen((p) => !p);

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        py: 1,
        px: 1,
        backdropFilter: "saturate(180%) blur(8px)",
      }}
    >
      <Container maxWidth="lg">
        <NavBarContainer elevation={8}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <MenuItem to="/cards">Итоги</MenuItem>
            <MenuItem to="/templates">Шаблоны</MenuItem>
          </Box>
          <MenuToggle toggle={toggle} isOpen={isOpen} />
          <AuthorisationLinks isOpen={isOpen} />
        </NavBarContainer>
      </Container>
    </Box>
  );
};
