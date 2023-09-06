import "./PokemonList.css";
import Pokemon from "../pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {
 const [pokemonListState, setPokemonListState] = usePokemonList();
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
        <button
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              pokeDexUrl: pokemonListState.prevUrl,
            })
          }
        >
          Prev
        </button>
        <button
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              pokeDexUrl: pokemonListState.nextUrl,
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;