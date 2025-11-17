import React from "react";
import { UserType } from "@/types/user";
import { useAuth } from "@/auth";
import { Avatar, Button, Popover, Typography, Box, Stack } from "@mui/material";

export const AccountAvatar = ({ user, hasPopover }: { user: UserType; hasPopover?: boolean }) => {
  const { logoutMutation } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box onClick={handleOpen} sx={{ cursor: "pointer" }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {user.image && (
            <Avatar
              alt={user.nickname}
              src={user.image.url}
              sx={{ width: 40, height: 40 }}
              variant="square"
            />
          )}
          <Typography variant="body1">{user.nickname}</Typography>
        </Stack>
      </Box>

      {hasPopover && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Box sx={{ p: 1.5, width: 200 }}>
            <Button variant="outlined" onClick={handleLogout} fullWidth>
              Выйти
            </Button>
          </Box>
        </Popover>
      )}
    </>
  );
};
