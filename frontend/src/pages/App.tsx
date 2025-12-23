import { Outlet } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/auth";
import { NavHeader } from "@components/NavHeader";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { Snowfall } from "react-snowfall";

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.secondary.light}22 100%)`,
}));

export const App = () => {
  const { logoutMutation } = useAuth();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Reset mutation state to avoid repeated invalidations across renders
      logoutMutation.reset();
    }
  }, [logoutMutation.isSuccess, logoutMutation, queryClient]);

  return (
    <StyledContainer>
      <NavHeader />
      <Outlet />
      <Snowfall snowflakeCount={70} />
    </StyledContainer>
  );
};
