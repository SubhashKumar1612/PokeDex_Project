import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id){
    const [pokemon,setPokemon]=useState({});

    async function downloadPokemons(){
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonOfSameTypes=await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name:" "}`)
        console.log("s",pokemonOfSameTypes)
        
        setPokemon({
            image:response.data.sprites.other.dream_world.front_default,
            name:response.data.name,
            weight:response.data.weight,
            height:response.data.height,
            type:response.data.types.map((t)=>t.type.name),
            similarPokemons:pokemonOfSameTypes.data.pokemon.slice(0,5)

        });
        setPokemonListState({...pokemonListState, type:response.data.types ? response.data.types[0].type.name:" "})
    }
    const { pokemonListState,setPokemonListState}=usePokemonList()
    useEffect(()=>{
        downloadPokemons();
        console.log("list",pokemonListState);
    },[id]);
    return [pokemon];
}
export default usePokemonDetails;




// import axios from "axios";
// import { useEffect, useState } from "react";
// import usePokemonList from "./usePokemonList";

// function usePokemonDetails(id) {
//     const [pokemon, setPokemon] = useState({});
//     const { pokemonListState, setPokemonListState } = usePokemonList();

//     async function downloadPokemons() {
//         try {
//             const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//             const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types[0].type.name}`);
            
//             setPokemon({
//                 image: response.data.sprites.other.dream_world.front_default,
//                 name: response.data.name,
//                 weight: response.data.weight,
//                 height: response.data.height,
//                 type: response.data.types.map((t) => t.type.name),
//                 similarPokemons: pokemonOfSameTypes.data.pokemon.slice(0, 5),
//             });

//             setPokemonListState(prevState => ({
//                 ...prevState,
//                 type: response.data.types[0].type.name
//             }));
//         } catch (error) {
//             console.error("Error fetching Pokemon details:", error);
//         }
//     }

//     useEffect(() => {
//         if (id) {
//             downloadPokemons();
//         }
//     }, [id]);

//     return [pokemon];
// }

// export default usePokemonDetails;

