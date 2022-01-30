import React, { useEffect, useState }  from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Pages/Main';
import Navbar from "./components/Navbar";
import PokemonData from './Pages/PokemonData';
import { FavoriteProvider } from "./context/favoritesContext";
import FavoritesPokemons from './Pages/FavoritesPokemons';

const localStoreKey = "favirite_pokemons";

function App() {

  const [favorites, setFavorites] = useState([]);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
        updated.splice(isFavorite, 1);
    } else {
        updated.push(name);
    }
    setFavorites(updated);
    console.log(updated)
    window.localStorage.setItem(localStoreKey, JSON.stringify(updated));
};

  const loadFavoritePokemons = () => {
    const pokemons =
        JSON.parse(window.localStorage.getItem(localStoreKey)) || [];
    setFavorites(pokemons);
    console.log(pokemons)
};

useEffect(() => {
    loadFavoritePokemons();
}, []);

  return (
    <div >
<FavoriteProvider
          value={{
              favoritePokemons: favorites,
              updateFavoritePokemons: updateFavoritePokemons,
          }}
        >
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/favorites" element={<FavoritesPokemons favorites={favorites}/>} />
          <Route path="/:pokemon" element={<PokemonData/>} />
        </Routes>
      </BrowserRouter>
      </FavoriteProvider>
    </div>
  )
}

export default App;
