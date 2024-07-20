import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './pokemonDetail.css'
import usePokemonList from "../../hooks/usePokemonList";
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails(){
    
    const {id}=useParams();
    const [pokemon]=usePokemonDetails(id);
    
    // if (!pokemon || Object.keys(pokemon).length === 0) {
    //     return <div>Loading...</div>;
    // }
    return(
        <div className="pokemon-details">
            <img className="pokemon-img" src={pokemon.image} />
           <div  className="pokemon-name"><span>{pokemon.name}</span></div>
           <div className="pokemon-name">Height: {pokemon.height}</div>
           <div className="pokemon-name">weight: {pokemon.weight}</div>
           <div className="pokemon-types">
                Type:- {pokemon.type && pokemon.type.map((t)=><div key={t}>{t}</div>)}
           </div>
            {pokemon.similarPokemons &&
            <div>
                      More {pokemon.type[0]} type pokemons
                     <ul>
                          {pokemon.similarPokemons.map((p) => <li key={p.pokemon.id}>{p.pokemon.name}</li>)}
                    </ul>
            </div>
            }
        </div>
    )
}
export default PokemonDetails;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import './pokemonDetail.css';
// import usePokemonDetails from "../../hooks/usePokemonDetails";

// function PokemonDetails() {
//     const { id } = useParams();
//     const [pokemon] = usePokemonDetails(id);

//     if (!pokemon || Object.keys(pokemon).length === 0) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="pokemon-details">
//             {pokemon.image && <img className="pokemon-img" src={pokemon.image} alt={pokemon.name} />}
//             <div className="pokemon-name"><span>{pokemon.name}</span></div>
//             <div className="pokemon-name">Height: {pokemon.height}</div>
//             <div className="pokemon-name">Weight: {pokemon.weight}</div>
//             <div className="pokemon-types">
//                 Type: {pokemon.type && pokemon.type.map((t) => <div key={t}>{t}</div>)}
//             </div>
//             {pokemon.similarPokemons &&
//                 <div>
//                     More {pokemon.type[0]} type pokemons
//                     <ul>
//                         {pokemon.similarPokemons.map((p) => <li key={p.pokemon.id}>{p.pokemon.name}</li>)}
//                     </ul>
//                 </div>
//             }
//         </div>
//     );
// }

// export default PokemonDetails;
