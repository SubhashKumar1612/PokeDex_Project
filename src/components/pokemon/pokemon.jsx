import './pokemon.css';
import {Link } from 'react-router-dom'

function Pokemon({name,image,id}){
    return(
        <Link to={`/pokemon/${id}`}>
        <div className='pokemon'>
            <div className='pokemon-name'>{name}</div>
            <div><img className="pokemon-img" src={image}/></div>
        </div>
        </Link>
    )
}
export default Pokemon;