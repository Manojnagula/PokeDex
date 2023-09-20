import useDebounce from "../../hooks/useDebounce";
import "./Search.css";

function Search({ updateSearchTerm }) {
  const debounceUpdataedSearch = useDebounce((e) => updateSearchTerm(e.target.value));
  return <input id="search-pokemon" type="text"
   placeholder="Just name a pokemon..." 
   onChange={debounceUpdataedSearch} />
}
export default Search;
