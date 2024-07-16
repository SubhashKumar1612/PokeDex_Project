import { useEffect, useState } from "react";
import './pokemonList.css'
import axios from "axios";
import Pokemon from "../pokemon/pokemon";

function PokemonList(){

    const [pokemonList,setPokemonList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl,setNextUrl]=useState('');
    const [prevUrl,setPrevUrl]=useState('');


    async function downloadPokemons(){
        setIsLoading(true);
        const response=await axios.get(pokedexUrl);//This is downloads list of 20 pokemons 
        const pokemonResults=response.data.results; // we get the array of Pokemons from the results
        //iterating over the array of pokemon and using their url , to create an array of promises that will download those 20 pokemon

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);


        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        const pokemonData=await axios.all(pokemonResultPromise);  //passing that promise array to axios. all and it containss array of 20 pokemon detailed data;
        console.log(pokemonData);
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
        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokedexUrl]);
    


    return(
        <div className="pokemon-list-wrapper">
           <div className="pokemon-wrapper">
               {(isLoading)?'loading...':
                  pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} />)
               }
           </div>
           <div className="controls">
               <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
               <button disabled={nextUrl==null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
           </div>
        </div>
    )
}
export default PokemonList;