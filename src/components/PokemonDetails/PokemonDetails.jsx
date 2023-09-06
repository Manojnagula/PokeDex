import "./pokemonDetails.css";
import { Link, useParams } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon] = usePokemon(id)
  return (
    <>
      <h1 className="pokedex-redirect">
        <Link className="link" to="/">POKEDEX</Link>
      </h1>
      {pokemon && (
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
      )}
    </>
  );
}
export default PokemonDetails;