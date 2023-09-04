import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";

function PokemonList() {

  const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";

  async function downloadPokemons() {
    const response = await axios.get(POKEDEX_URL);
    const pokemonResults = response.data.results;
    const pokemonPromises = pokemonResults.map(async (pokemon) => {
      return await axios.get(pokemon.url);
      
    });
console.log(pokemonPromises);
    try{
    const pokemonListData = await axios.all(pokemonPromises); 

    const pokemonFinalList = pokemonListData.map((pokemonData) => {
      console.log(pokemonData);
      const pokemon = pokemonData.data;
      return {
        id: pokemon.id,
        name:pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    console.log(pokemonFinalList);
  }catch(error){
    console.error(error.message);
  }
  }
  useEffect(() => {
    downloadPokemons();
  }, []);
}


export default PokemonList;
