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
    <CustomLink to={to}>
      <Typography>{children}</Typography>
    </CustomLink>
  );
};
