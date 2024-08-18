// import { useEffect, useState } from "react";
// import './pokemonList.css'
// import axios from "axios";
// import Pokemon from "../pokemon/pokemon";
// import usePokemonList from "../../hooks/usePokemonList";

// function PokemonList(){
//     const {pokemonListState,setPokemonListState}=usePokemonList(false);

//     return(
//         <div className="pokemon-list-wrapper">
//            <div className="pokemon-wrapper">
//                {(pokemonListState.isLoading)?'loading...':
//                 pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
//                }
//            </div>
//            <div className="controls">
//                <button disabled={pokemonListState.prevUrl==null} onClick={()=>{
//                 const urlToset=pokemonListState.prevUrl;
//                setPokemonListState({...pokemonListState, pokedexUrl:urlToset})
//                }}>Prev</button>

//                <button disabled={pokemonListState.nextUrl==null} onClick={()=>{
//                 const urlToset=pokemonListState.nextUrl;
//                 setPokemonListState({...pokemonListState, pokedexUrl:urlToset})
//                 }}>Next</button> 

//            </div>
//         </div>
//     )
// }
// export default PokemonList;




import { useEffect, useState } from "react";
import './pokemonList.css';
import axios from "axios";
import Pokemon from "../pokemon/pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList({ searchQuery }) {
    const { pokemonListState, setPokemonListState } = usePokemonList(false);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            // Filter the Pokémon list based on the search query
            setFilteredPokemonList(
                pokemonListState.pokemonList.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            // If no search query, display the full list
            setFilteredPokemonList(pokemonListState.pokemonList);
        }
    }, [searchQuery, pokemonListState.pokemonList]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {pokemonListState.isLoading ? 'loading...' :
                    filteredPokemonList.map(p => (
                        <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                    ))
                }
            </div>
            <div className="controls">
                <button
                    disabled={pokemonListState.prevUrl == null}
                    onClick={() => {
                        const urlToSet = pokemonListState.prevUrl;
                        setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
                    }}
                >
                    Prev
                </button>

                <button
                    disabled={pokemonListState.nextUrl == null}
                    onClick={() => {
                        const urlToSet = pokemonListState.nextUrl;
                        setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
