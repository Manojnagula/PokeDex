import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../pokemon/Pokemon";

function PokemonList() {
  const DEAFAULT_URL = "https://pokeapi.co/api/v2/pokemon";
  // const [pokemonList, setPokemonList] = useState([]);
  // const [nextUrl, setNextUrl] = useState(DEAFAULT_URL);
  // const [pervUrl, setPrevUrl] = useState(DEAFAULT_URL);
  // const [pokeDexUrl, setPokeDexurl] = useState(DEAFAULT_URL);

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList:[],
    pokeDexUrl:DEAFAULT_URL,
    nextUrl:DEAFAULT_URL,
    pervUrl:DEAFAULT_URL
  });

  async function downloadPokemons() {
    const response = await axios.get(pokemonListState.pokeDexUrl ? pokemonListState.pokeDexUrl : DEAFAULT_URL);
    const pokemonResults = response.data.results;
    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);

    // setPokemonListState((state)=>({...state,nextUrl:response.data.next,pervUrl:response.data.previous}))

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

    setPokemonListState((state)=>({...state, pokemonList:pokemonFinalList,nextUrl:response.data.next,pervUrl:response.data.previous}));
  }
  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokeDexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <h1>Pokemons</h1>

      {/* Here iterating through updated pokemonList array */}
      <div className="pokemon-list">
        {pokemonListState.pokemonList.map((pokemon) => (
          <Pokemon
            name={pokemon.name}
            key={pokemon.id}
            url={pokemon.image}
            id={pokemon.id}
          />
        ))}
      </div>
      <div className="page-controls">
        <button onClick={() => setPokemonListState({...pokemonListState, pokeDexUrl:pokemonListState.pervUrl})}>Prev</button>
        <button onClick={() =>setPokemonListState({...pokemonListState, pokeDexUrl:pokemonListState.nextUrl})}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
