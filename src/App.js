import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import {getPokemons, getPokemonData} from './api'

function App() {

  const [pokemons, setPokemons] = useState([])
  const fetchPokemons = async () =>{
    try{
      const data = await getPokemons()
      const promises = data.results.map(async (pokemon) =>{ 
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
    }catch(err){
      
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [])

  return (
    <div >
      <Navbar/>
      <Searchbar/>
      <Pokedex pokemons={pokemons}/>
    </div>
  );
}

export default App;
