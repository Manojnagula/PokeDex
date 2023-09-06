import axios from "axios";
import { useEffect, useState } from "react";

function usePokemon(id){
    const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/`;

    const [pokemon, setPokemon] = useState(null);
  
    async function downloadPokemons(id) {
      const response = await axios.get(pokemonDetailsUrl + id);
      const pokemon = response.data;
      setPokemon({
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types,
        image: pokemon.sprites.other.dream_world.front_default,
      });
    }
    useEffect(() => {
      downloadPokemons(id);
    });

    return [pokemon];
}
export default usePokemon;