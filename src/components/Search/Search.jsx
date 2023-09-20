import "./Search.css";

function Search({ updateSearchTerm }) {
  return <input id="search-pokemon" type="text"
   placeholder="Just name a pokemon..." 
   onChange={(e) => updateSearchTerm(e.target.value)} />
}
export default Search;
