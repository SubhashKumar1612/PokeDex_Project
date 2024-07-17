import { useEffect, useState } from "react";
import './pokemonList.css'
import axios from "axios";
import Pokemon from "../pokemon/pokemon";

function PokemonList(){
    const [pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:`https://pokeapi.co/api/v2/pokemon`,
        nextUrl:'',
        prevUrl:''
    });


    async function downloadPokemons(){
        setPokemonListState((state) =>({...state, isLoading:true}));
        const response=await axios.get(pokemonListState.pokedexUrl);//This is downloads list of 20 pokemons 
        const pokemonResults=response.data.results; // we get the array of Pokemons from the results
        //iterating over the array of pokemon and using their url , to create an array of promises that will download those 20 pokemon

       
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

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);
    


    return(
        <div className="pokemon-list-wrapper">
           <div className="pokemon-wrapper">
               {(pokemonListState.isLoading)?'loading...':
                pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
               }
           </div>
           <div className="controls">
               <button disabled={pokemonListState.prevUrl==null} onClick={()=>{
                const urlToset=pokemonListState.prevUrl;
               setPokemonListState({...pokemonListState, pokedexUrl:urlToset})
               }}>Prev</button>

               <button disabled={pokemonListState.nextUrl==null} onClick={()=>{
                const urlToset=pokemonListState.nextUrl;
                setPokemonListState({...pokemonListState, pokedexUrl:urlToset})
                }}>Next</button> 

           </div>
        </div>
    )
}
export default PokemonList;