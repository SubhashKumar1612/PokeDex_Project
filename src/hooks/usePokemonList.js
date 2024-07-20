
import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(type){
    const [pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:'',
        type:''
    });

    
    async function downloadPokemons(){

       


        if(pokemonListState.type){
            const response=await axios.get(`https://pokeapi.co/api/v2/type/${pokemonListState.type}`);//This is downloads list of 20 pokemons 
            setPokemonListState((state)=>({
                ...state,
                pokemonList:response.data.pokemon
            }));

            // setPokemonListState((state)=>({
            //     ...state,
            //     pokemonList:response.data.pokemon.slice(0,5)
            // }))
        }else{

            setPokemonListState((state) =>({...state, isLoading:true}));
            console.log("check",pokemonListState.pokedexUrl)
            const response=await axios.get(pokemonListState.pokedexUrl);//This is downloads list of 20 pokemons 
            const pokemonResults=response.data.results; // we get the array of Pokemons from the results
            //iterating over the array of pokemon and using their url , to create an array of promises that will download those 20 pokemon
            console.log("respone is ",response.data.pokemon)
           
            setPokemonListState((state)=>({
                ...state,
                nextUrl:response.data.next,
                prevUrl:response.data.previous
            }));



            const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
            const pokemonData=await axios.all(pokemonResultPromise);  //passing that promise array to axios. all and it containss array of 20 pokemon detailed data;

        //iterate on the data of each pokemon and extract id, imgae ,type
                 const res=pokemonData.map((pokedata) => {
                const pokemon=pokedata.data;
                return {
                    id:pokemon.id,
                    name: pokemon.name, 
                    image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_default,
                    types:pokemon.types
              }
            });

    
            setPokemonListState((state)=>({
                ...state,
                pokemonList:res,
                isLoading:false
            }));
        }
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);

    return {
        pokemonListState,setPokemonListState
    }
}
export default usePokemonList;  