import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/Types";
import { userInfo } from "os";
import { pokemonTabs } from "../../utils/Constants";

const initialState: AppTypeInitialState = {
    toasts: [],
    userInfo: undefined,
    isLoading: true,
    currentPokemonTab: pokemonTabs.description,
};

export const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setToast: (state, action) => {
            const toasts = [...state.toasts];
            toasts.push(action.payload);
            state.toasts = toasts;
        },
        clearToasts: (state) => {
            state.toasts = [];
        },
        setUserStatus: (state, action) => {
            state.userInfo = action.payload;
        },
        setPokemonTab: (state, action) => {
            state.currentPokemonTab = action.payload;
        },
    },
});

export const {setToast, clearToasts, setUserStatus, setLoading, setPokemonTab} = AppSlice.actions;