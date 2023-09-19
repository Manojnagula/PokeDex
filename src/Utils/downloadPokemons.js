import axios from "axios";

async function downloadPokemons(pokemonListState, setPokemonListState, defaultUrl, limit = 20) {
    console.log(pokemonListState.pokeDexUrl,defaultUrl)
    const response = await axios.get(
        pokemonListState.pokeDexUrl ? pokemonListState.pokeDexUrl : defaultUrl);
    let pokemonResults = response.data.results? response.data.results : response.data.pokemon; //array of pokemons
        pokemonResults = pokemonResults.slice(0,limit);

    const pokemonPromises = pokemonResults.map((p) => {
        if (p.url) {
            return axios.get(p.url);
        } else if (p.pokemon.url) {
            return axios.get(p.pokemon.url);

        }
    });

    const pokemonListData = await axios.all(pokemonPromises);
    console.log(pokemonListData)
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

export default downloadPokemons;