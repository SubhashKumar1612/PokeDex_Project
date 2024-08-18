
// import PokemonList from "../PokemonList/PokemonList";
// import Search from "../search/search";
// import './Pokedex.css'
// import Footer from "../Footer.jsx/Footer";

// function Pokedex(){
//     return (
//         <div className="pokedex-wrapper">
//             <Search/>
//            <PokemonList/>
//            {/* <Footer /> */}
//         </div>
//     )
// }
// export default Pokedex;



// Pokedex.js
import { useState } from 'react';
import PokemonList from "../PokemonList/PokemonList";
import Search from "../search/search";
import './Pokedex.css';
import Footer from "../Footer.jsx/Footer";

function Pokedex() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="pokedex-wrapper">
            <Search onSearch={handleSearch} />
            <PokemonList searchQuery={searchQuery} />
            {/* <Footer /> */}
        </div>
    );
}

export default Pokedex;
