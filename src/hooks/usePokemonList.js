import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
    
    const DEAFAULT_URL = "https://pokeapi.co/api/v2/pokemon";


    const [pokemonListState, setPokemonListState] = useState({
      pokemonList: [],
      pokeDexUrl: DEAFAULT_URL,
      nextUrl: DEAFAULT_URL,
      prevUrl: DEAFAULT_URL,
    });
  
    async function downloadPokemons() {
      const response = await axios.get(
        pokemonListState.pokeDexUrl ? pokemonListState.pokeDexUrl : DEAFAULT_URL
      );
      const pokemonResults = response.data.results;
  
  
      const pokemonPromises = pokemonResults.map((pokemon) => {
        return axios.get(pokemon.url);
      });
  
      const pokemonListData = await axios.all(pokemonPromises);
  
      const pokemonFinalList = pokemonListData.map((pokemonData) => {
        const pokemon = pokemonData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          types: pokemon.types,
        };
      });
      //upto here just grabbing data from api and storing it
  
      //updating pokemon list array values with the objects we got from pokemon final list.
      // setPokemonList(pokemonFinalList);
  
      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokemonFinalList,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));
    }
    useEffect(() => {
      downloadPokemons();
    }, [pokemonListState.pokeDexUrl]);

    return [pokemonListState,setPokemonListState]
  
}
export default usePokemonList;