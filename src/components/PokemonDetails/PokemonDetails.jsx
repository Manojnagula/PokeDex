import { useEffect, useState } from "react";
import "./pokemonDetails.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function PokemonDetails() {
  const { id } = useParams();
  const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/`;

  const [pokemon, setPokemon] = useState(null);

  async function downloadPokemons() {
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
    downloadPokemons();
  });
  return (
    <>
    <h1 className='pokedex-redirect'>
      <Link  to="/">POKEDEX</Link>
    </h1>
    {pokemon && 
    <div className="pokemonDetailsWrapper">
      <div className="pokemonName">{pokemon.name}</div>
      <div>
        <img
          className="pokemon-image"
          src={pokemon.image}
          alt="pokemon-image"
        />
      </div>
      <div className="pokemon-attribute">
        <div>Weight: {pokemon.weight}</div>
        <div>Height: {pokemon.height}</div>
      </div>
      <div className="pokemon-types">
        <h1>Type:</h1>
        {pokemon.types.map((t) => (
          <span className="type" key={t.type.name}>
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
    }
  </>
  );
}
export default PokemonDetails;
