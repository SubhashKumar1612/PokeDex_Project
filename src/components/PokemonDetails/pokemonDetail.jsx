import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './pokemonDetail.css'

function PokemonDetails(){
    const {id}=useParams();
    const [pokemon,setPokemon]=useState({});
    async function downloadPokemons(){
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            image:response.data.sprites.other.dream_world.front_default,
            name:response.data.name,
            weight:response.data.weight,
            height:response.data.height,
            type:response.data.types.map((t)=>t.type.name),

        })
    }

    useEffect(()=>{
        downloadPokemons();
    },[])

    return(
        <div className="pokemon-details">
            <img className="pokemon-img" src={pokemon.image} />
           <div  className="pokemon-name"><span>{pokemon.name}</span></div>
           <div className="pokemon-name">Height: {pokemon.height}</div>
           <div className="pokemon-name">weight: {pokemon.weight}</div>
           <div className="pokemon-types">
                Type:- {pokemon.type && pokemon.type.map((t)=><div key={t}>{t}</div>)}
           </div>
        </div>
    )
}
export default PokemonDetails;