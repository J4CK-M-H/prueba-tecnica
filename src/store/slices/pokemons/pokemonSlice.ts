import { createSlice } from "@reduxjs/toolkit";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonState {
  pokemons: Pokemon[];
}

const initialState: PokemonState = {
  pokemons: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
  },
});

export const { setPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
