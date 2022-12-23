import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../hook";
import { changePage } from "../Model/ApplicationSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="a"
            href="#"
            onClick={() => {
              dispatch(changePage("mainMenu"));
            }}
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontFamily: "McLetters",
              fontWeight: 800,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Monix
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
