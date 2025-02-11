import { apiPokemon } from "../api";

export const getPokemons = async () => {
  const { data } = await apiPokemon.get("");

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const response = await apiPokemon.get(pokemon.name); // Consulta individual por cada Pokémon
      return {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default, // Imagen del Pokémon
      };
    })
  );
  return pokemonDetails;
};
