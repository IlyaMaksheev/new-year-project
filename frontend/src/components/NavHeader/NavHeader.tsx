import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { NavBarContainer, NavBarStickyWrapper } from "./ui/styled.ts";
import { AuthorisationLinks } from "./ui/AuthorisationLinks.tsx";
import { MenuItem } from "./ui/MenuItem.tsx";

export const NavHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <NavBarStickyWrapper component="header">
      <Container maxWidth="lg">
        <NavBarContainer elevation={8}>
          {/* Left: brand/menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Mobile hamburger */}
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton
                aria-label="Открыть меню"
                size="large"
                onClick={() => setOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            {/* Desktop nav links */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, alignItems: "center" }}>
              <MenuItem to="/cards">Итоги</MenuItem>
              <MenuItem to="/templates">Шаблоны</MenuItem>
            </Box>
          </Box>

          {/* Right: auth/actions */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <AuthorisationLinks />
          </Box>

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: { width: 300, p: 1 } }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/cards" onClick={() => setOpen(false)}>
                  <ListItemText primary="Итоги" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/templates" onClick={() => setOpen(false)}>
                  <ListItemText primary="Шаблоны" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ px: 1, pb: 1 }}>
              <AuthorisationLinks />
            </Box>
          </Drawer>
        </NavBarContainer>
      </Container>
    </NavBarStickyWrapper>
  );
};
