"use client";

import { PropsWithChildren } from "react";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styled } from "@mui/material/styles";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      iconVariant={{
        success: <CheckCircleOutlineIcon />,
        error: <ErrorOutlineIcon />,
      }}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      minWidth: "600px!important",
    },
    "& svg": {
      marginRight: theme.spacing(1),
      marginBottom: "auto",
    },
    "&.notistack-MuiContent-success": {
      backgroundColor: theme.palette.success.main,
    },
  }),
);
