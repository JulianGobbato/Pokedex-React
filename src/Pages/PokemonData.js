import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { searchPokemon } from '../api'
import { Link, useNavigate } from 'react-router-dom';

const PokemonData = () => {
    const navigate = useNavigate()

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);

    const {pokemon} = useParams()
    const pokemonInfo = async (pokemon) =>{
        const data = await searchPokemon(pokemon)
        setPokemonData(data)
        setLoading(false)
    }

    useEffect(() => {
        pokemonInfo(pokemon)
    }, [])
    return (
        <div>
            {loading ?
                <h1>cargando</h1>
                :
                <div>
                    <h1>{pokemonData.name}</h1>
                    <Link to={"/"}> <h2>back</h2> </Link>
                    <button onClick={() => navigate(-1)}>go back</button>
                </div>
                
            }
        </div>
    )
}

export default PokemonData
