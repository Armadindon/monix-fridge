import React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useAppDispatch } from "../hook";
import { setToken } from "../Model/UserSlice";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import config from "../config";

const LoginPage = () => {
  const [code, setCode] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // Note pour cet appel api, on utilise pas WebApi.ts, car celui-ci dépend sur le token, or, ici on fetch le token
    try {
      const loginResponse = await axios.post(
        `${config.urlBackend}/auth/codeLogin`,
        {
          code: code,
        }
      );
      const jwtToken = loginResponse.data?.data?.token;
      dispatch(setToken(jwtToken));
      // Si l'utilisateur demande a qu'on se rappelle de sa connexion, on stocke dans le localstorage
      //On change l'utilisateur de page
      dispatch(changePage("mainMenu"));
      dispatch(
        addSnackbarMessage({
          message: "Vous êtes bien connecté ! 👋",
          options: {
            variant: "success",
          },
        })
      );
      //eslint-disable-next-line
    } catch (error: any) {
      console.log(error);
      if (
        error?.response?.data?.message &&
        typeof error?.response?.data?.message == "string"
      ) {
        dispatch(
          addSnackbarMessage({
            message: error.response.data.message,
            options: {
              variant: "error",
            },
          })
        );
      } else {
        dispatch(
          addSnackbarMessage({
            message: "Erreur inconnue en contactant l'api",
            options: {
              variant: "error",
            },
          })
        );
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Code personnel"
            type="password"
            id="password"
            autoComplete="current-password"
            value={code}
            onChange={(evt) => setCode(evt.currentTarget.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Connexion
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
