// import "./search.css"

// function Search(){
//     return(
//         <div className="search-wrapper">
//             <input
//             id="pokemon-name-search"
//                 type="text"
//                 placeholder="Pokemon name ..."
//             />
//         </div>
//     )
// }
// export default Search;



// Search.js
import { useState } from 'react';
import './search.css';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="search-wrapper">
            <input
                id="pokemon-name-search"
                type="text"
                placeholder="Pokemon name ..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}

export default Search;
