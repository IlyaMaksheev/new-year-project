import { createLink } from "@tanstack/react-router";
import { Link } from "@mui/material";

import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

interface IMenuProps {
  children: ReactNode;
  to: string;
}

export const CustomLink = createLink(Link);

export const MenuItem = ({ children, to = "/" }: IMenuProps) => {
  return (
    <CustomLink
      to={to}
      underline="none"
      color="inherit"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.25,
        py: 0.75,
        borderRadius: 1,
        "&:hover": { backgroundColor: (theme) => theme.palette.action.hover },
        minHeight: 44,
      }}
    >
      <Typography variant="body1">{children}</Typography>
    </CustomLink>
  );
};
