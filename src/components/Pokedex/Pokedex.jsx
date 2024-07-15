
import PokemonList from "../PokemonList/PokemonList";
import Search from "../search/search";
import './Pokedex.css'

function Pokedex(){
    return (
        <div className="pokedex-wrapper">
           <h1 id="pokedex-heading"> Pokedex</h1>
            <Search/>
           <PokemonList/>
        </div>
    )
}
export default Pokedex;