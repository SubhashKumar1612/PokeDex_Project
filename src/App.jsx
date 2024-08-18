
import { Link } from 'react-router-dom';
import './App.css';
import Pokedex from './components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes';
import Footer from './components/Footer.jsx/Footer';

function App() {
  return (
    <div className='outer-pokedex'>
    <h1 id="pokedex-heading">
     <Link to={`/`} >Pokedex</Link>
     </h1>
      <CustomRoutes/>
      <Footer />
    </div>
  )
}

export default App
