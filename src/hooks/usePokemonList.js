
// import axios from "axios";
// import { useEffect, useState } from "react";

// function usePokemonList(){
//     const [pokemonListState,setPokemonListState]=useState({
//         pokemonList:[],
//         isLoading:true,
//         pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
//         nextUrl:'',
//         prevUrl:'',
//     });

    
//     async function downloadPokemons(){


//             setPokemonListState((state) =>({...state, isLoading:true}));
//             console.log("check",pokemonListState.pokedexUrl)
//             const response=await axios.get(pokemonListState.pokedexUrl);//This is downloads list of 20 pokemons 
//             const pokemonResults=response.data.results; // we get the array of Pokemons from the results
//             //iterating over the array of pokemon and using their url , to create an array of promises that will download those 20 pokemon
//             console.log("respone is ",response.data.pokemon)
           
//             setPokemonListState((state)=>({
//                 ...state,
//                 nextUrl:response.data.next,
//                 prevUrl:response.data.previous
//             }));



//             const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
//             const pokemonData=await axios.all(pokemonResultPromise);  //passing that promise array to axios. all and it containss array of 20 pokemon detailed data;

//         //iterate on the data of each pokemon and extract id, imgae ,type
//                  const res=pokemonData.map((pokedata) => {
//                 const pokemon=pokedata.data;
//                 return {
//                     id:pokemon.id,
//                     name: pokemon.name, 
//                     image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_default,
//                     types:pokemon.types
//               }
//             });

    
//             setPokemonListState((state)=>({
//                 ...state,
//                 pokemonList:res,
//                 isLoading:false
//             }));
//         }
//     }

//     useEffect(()=>{
//         downloadPokemons();
//     },[pokemonListState.pokedexUrl]);

//     return {
//         pokemonListState,setPokemonListState
//     }

// export default usePokemonList;  


import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: '',
    });

    async function downloadPokemons() {
        try {
            // Set loading state to true
            setPokemonListState((state) => ({ ...state, isLoading: true }));

            // Fetch the list of 20 Pokémon
            const response = await axios.get(pokemonListState.pokedexUrl);
            const pokemonResults = response.data.results;

            // Update next and previous URLs
            setPokemonListState((state) => ({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous,
            }));

            // Fetch detailed data for each Pokémon
            const pokemonResultPromises = pokemonResults.map((pokemon) =>
                axios.get(pokemon.url)
            );
            const pokemonData = await Promise.all(pokemonResultPromises);

            // Extract id, name, image, and types from the fetched data
            const pokemonList = pokemonData.map((pokedata) => {
                const pokemon = pokedata.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default,
                    types: pokemon.types.map((type) => type.type.name),
                };
            });

            // Update the state with the fetched Pokémon data and set loading to false
            setPokemonListState((state) => ({
                ...state,
                pokemonList,
                isLoading: false,
            }));
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            // Optionally, set an error state here if needed
        }
    }

    // Fetch Pokémon data when the component mounts or when the URL changes
    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return {
        pokemonListState,
        setPokemonListState,
    };
}

export default usePokemonList;
