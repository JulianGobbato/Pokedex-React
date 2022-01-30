import React, { useState, useEffect } from "react";
import { searchPokemon } from "../api";
import Pokemon from "../components/Pokemon"
import '../style/FavoritesPokemons.css'


const FavoritesPokemons = (props) => {

    const {favorites} = props
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPokemons = async () => {
        setLoading(true);
        try {
            const promises= await favorites.map(async (pokemon) => {
                return await searchPokemon(pokemon);
            });
            const results = await Promise.all(promises);
                setPokemons(results);
            setLoading(false);
        } catch (err) {}
    };

    useEffect(() => {
            fetchPokemons();
    }, [favorites]);


    return (
        <div>
            {loading ?
                <div> Cargando pokemones </div>
                :
                <div className="favorites-grid">
                    {pokemons.map((pokemon)=>{
                        return(
                        <Pokemon pokemon ={pokemon} key={pokemon.name}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default FavoritesPokemons
