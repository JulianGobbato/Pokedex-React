import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import {getPokemons, getPokemonData, searchPokemon} from './api'
import { FavoriteProvider } from './context/favoritesContext';

const localStoreKey = "favirite_pokemons"

function App() {

  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [searching, setSearching] = useState(false)

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
      setNotFound(false)
    }catch(err){
      
    }
  }

  const loadFavoritePokemons = () =>{
    const pokemons = JSON.parse(window.localStorage.getItem(localStoreKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, [])

  useEffect(() => {
    if(!searching){
      fetchPokemons()
    }
  }, [page])


  const updateFavoritePokemons = (name) =>{
    const updated = [...favorites]
    const isFavorite = favorites.indexOf(name)
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1)
    } else {
      updated.push(name)
    }
    setFavorites(updated)
    window.localStorage.setItem(localStoreKey, JSON.stringify(updated))
  }

  const onSearch = async (pokemon) =>{
    if (!pokemon) {
      return fetchPokemons()
    }
    setLoading(true)
    setNotFound(false)
    setSearching(true)
    const result = await searchPokemon(pokemon)
    if (!result) {
      setNotFound(true)
      return
    } else {
      setPokemons([result])
      setPage(0)
      setTotal(1)
    }
    setLoading(false)
    setSearching(false)
  }

  return (
    <FavoriteProvider value={
      {favoritePokemons: favorites, 
      updateFavoritePokemons: updateFavoritePokemons}
    }
    >
    <div >
      <Navbar/>
      <Searchbar
        onSearch={onSearch}
      />
      { notFound ?
        <div>Pokemon not found</div>
        :(
        <Pokedex 
          pokemons={pokemons}
          page={page}
          setPage={setPage}
          total={total}
          loading={loading}
        />
        )}
    </div>
    </FavoriteProvider>
  );
}

export default App;
