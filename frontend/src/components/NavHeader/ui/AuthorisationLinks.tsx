import { MenuItem } from "./MenuItem.tsx";
import { useAuth } from "@/auth";
import Box from "@mui/material/Box";
import { ThemeToggle } from "@components/ThemeColorButton";
import Stack from "@mui/material/Stack";
import { AccountAvatar } from "@components/Account/AccountAvatar";

export const AuthorisationLinks = () => {
  const { user, isAuthenticated } = useAuth();

  const isAuth = isAuthenticated;
  console.log(isAuth, isAuthenticated);
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
        {!isAuth ? (
          <>
            <MenuItem to="/login">Войти</MenuItem> <MenuItem to="/register">Регистрация</MenuItem>
          </>
        ) : (
          <>
            {user && (
              <div style={{ display: "inline-block" }}>
                <AccountAvatar user={user} hasPopover></AccountAvatar>
              </div>
            )}{" "}
          </>
        )}

        <Box sx={{ height: "40px" }}>
          <ThemeToggle />
        </Box>
      </Stack>
    </Box>
  );
};
