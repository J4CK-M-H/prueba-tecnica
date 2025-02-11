import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../pokemons/pokemonSlice";

export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  nickName: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
  telefono: string;
  selectedPokemon: Pokemon | null;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsersSlice: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsersSlice } = userSlice.actions;
export default userSlice.reducer;
