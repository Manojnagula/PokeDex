import { useEffect, useState } from "react";
import "./pokemonDetails.css";
import { useParams } from "react-router-dom";
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
 pokemon &&  <div>
      <div>{pokemon.name}</div>
      <div>
        <img src={pokemon.image} alt="pokemon-image" />
      </div>
      <div>
        Weight: {pokemon.weight}
        Height: {pokemon.height}
      </div>
      <div>
        Type: 
        {pokemon.types.map((t) => (
          <span key={t.type.name}>{t.type.name}</span>
        ))}
      </div>
    </div>
  );
}
export default PokemonDetails;