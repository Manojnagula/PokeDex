import axios from "axios";
import { useEffect, useState } from "react";
import downloadPokemons from "../Utils/downloadPokemons";

function usePokemonList(){
    
    const DEAFAULT_URL = "https://pokeapi.co/api/v2/pokemon";


    const [pokemonListState, setPokemonListState] = useState({
      pokemonList: [],
      pokeDexUrl: DEAFAULT_URL,
      nextUrl: DEAFAULT_URL,
      prevUrl: DEAFAULT_URL,
    });
  
    
    useEffect(() => {
      downloadPokemons(pokemonListState,setPokemonListState,DEAFAULT_URL);
    }, [pokemonListState.pokeDexUrl]);

    return [pokemonListState,setPokemonListState]
  
}
export default usePokemonList;