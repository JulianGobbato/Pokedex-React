import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import {getPokemons, getPokemonData} from './api'

function App() {

  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchPokemons = async () =>{
    setLoading(true)
    try{
      const data = await getPokemons(30, 30 * page)
      const promises = data.results.map(async (pokemon) =>{ 
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setTotal(Math.ceil(data.count / 30))
      setLoading(false)
    }catch(err){
      
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [page])

  return (
    <div >
      <Navbar/>
      <Searchbar/>
      <Pokedex 
        pokemons={pokemons}
        page={page}
        setPage={setPage}
        total={total}
        loading={loading}
      />
    </div>
  );
}

export default App;
