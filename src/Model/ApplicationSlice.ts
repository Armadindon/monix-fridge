import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OptionsObject } from "notistack";

export type Pages = "login" | "mainMenu" | "selectProduct" | "creditAccount";

export type SnackBarMessage = {
  message: string;
  options: OptionsObject;
};

// Define a type for the slice state
export type ApplicationSliceState = {
  currentPage: Pages;
  messagesToShow: SnackBarMessage[];
};

// Define the initial state using that type
// Si le code de reset est présent, on redirige vers la page de reset de mdp
// sinon, on determine si l'utilisateur est connecté, si oui, mainpanel, sinon loginpanel
const initialState: ApplicationSliceState = {
  currentPage: "login",
  messagesToShow: [],
};

export const applicationSlice = createSlice({
  name: "application",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<Pages>) => {
      state.currentPage = action.payload;
    },
    addSnackbarMessage: (state, action: PayloadAction<SnackBarMessage>) => ({
      ...state,
      messagesToShow: [...state.messagesToShow, action.payload],
    }),
    removeFirstSnackbarMessage: (state) => {
      state.messagesToShow.shift();
    },
  },
});

export const { changePage, addSnackbarMessage, removeFirstSnackbarMessage } =
  applicationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCurrentPage = (state: RootState) =>
  state.application.currentPage;

export const getSnackbarMessages = (state: RootState) =>
  state.application.messagesToShow;

export default applicationSlice.reducer;
