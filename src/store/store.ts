import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemons/pokemonSlice";
import userReducer from "./slices/users/userSlice";
import authReducer from "./slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemon: pokemonReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
