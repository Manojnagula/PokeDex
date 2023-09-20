import "./PokemonDetails.css";
import { Link } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import Pokemon from "../pokemon/Pokemon";

function PokemonDetails({pokemonName}) {
  const [pokemon, pokemonListState] = usePokemon(pokemonName);
  
  return (
    <>
      <h1 className="pokedex-redirect">
        <Link className="link" to="/">POKEDEX</Link>
      </h1>
      {pokemon && (
        <div className="pokemonDetailsWrapper">
          <div className="pokemonName">{pokemon.name}</div>
          <div className="image-container">
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
      )}
      <div className="similar-pokemons">
      <h2>Similar Pokemons</h2>
      <div className="pokemon-similar-boxes">
        {pokemonListState.pokemonList.length > 0 && 
            pokemonListState.pokemonList.map((pokemon) => (
              <Pokemon
                name={pokemon.name}
                key={pokemon.id}
                url={pokemon.image}
                id={pokemon.id}
              />
            ))}

      </div>
      </div>
    </>
  );
}
export default PokemonDetails;