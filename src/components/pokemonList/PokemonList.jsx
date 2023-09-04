import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../pokemon/Pokemon";

function PokemonList() {
  const DEAFAULT_URL = "https://pokeapi.co/api/v2/pokemon"
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl,setNextUrl]=useState(DEAFAULT_URL);
  const [pervUrl,setPrevUrl]=useState(DEAFAULT_URL);

  const [pokeDexUrl, setPokeDexurl] = useState(DEAFAULT_URL);

  async function downloadPokemons() {
    const response = await axios.get(pokeDexUrl ? pokeDexUrl : DEAFAULT_URL);
    const pokemonResults = response.data.results;
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    const pokemonPromises = pokemonResults.map( (pokemon) => {
      return  axios.get(pokemon.url);
    });

    const pokemonListData = await axios.all(pokemonPromises);
    console.log(pokemonListData);

    const pokemonFinalList = pokemonListData.map((pokemonData) => {
      const pokemon = pokemonData.data;
      console.log(pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    //upto here just grabbing data from api and storing it

    //updating pokemon list array values with the objects we got from pokemon final list.
    setPokemonList(pokemonFinalList);
  }
  useEffect(() => {
    downloadPokemons();
  }, [pokeDexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <h1>Pokemons</h1>
      
      {/* Here iterating through updated pokemonList array */}
      <div className="pokemon-list">
      {pokemonList.map((pokemon) => (
        <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} />
      ))}
      </div>
      <div className="page-controls">
        <button onClick={()=>setPokeDexurl(pervUrl)}>Prev</button>
        <button onClick={()=>setPokeDexurl(nextUrl)}>Next</button>
      </div>
      
    </div>
  );
}

export default PokemonList;
