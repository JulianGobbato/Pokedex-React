import React, {useEffect, useState} from 'react'
import { useParams,} from 'react-router-dom'
import { searchPokemon, getTypeData } from '../api'
import { Link, useNavigate } from 'react-router-dom';
import '../style/PokemonData.css'
import '../style/Pokemon.css'
import PokemonStats from '../components/PokemonStats';
import Pokemon from '../components/Pokemon'

const PokemonData = () => {
    const navigate = useNavigate()
    const [pokemonData, setPokemonData] = useState([]);
    const [typeData, setTypeData] = useState([])
    const [loading, setLoading] = useState(true);
    const [prevPokemon, setPrevPokemon] = useState([])
    const [nextPokemon, setNextPokemon] = useState([])

    const {pokemon} = useParams()
    const pokemonInfo = async (pokemon) =>{
        setLoading(true)
        const data = await searchPokemon(pokemon)
        /*const type = await getTypeData(data.types.map((type)=>{return type.type.name}))*/
        const type = await getTypeData(data.types[0].type.name)
        /*const test = await data.types.map((type)=>{return (console.log(type.type.name))})
        console.log(test)*/
        const prevPokemon = data.id > 1 ? await searchPokemon(data.id-1) : ([])
        const nextPokemon = data.id < 898 ? await searchPokemon(data.id+1) : ([])
        setPokemonData(data)
        setTypeData(type)
        setPrevPokemon(prevPokemon)
        setNextPokemon(nextPokemon)
        setLoading(false)
    }
    useEffect(() => {
        pokemonInfo(pokemon)
    }, [navigate])
    return (
        <div> 
            <div>
                {loading ?
                    <h1>cargando</h1>
                    :
                    <div className='pokemon-data-container'>
                        <div> {pokemonData.id > 1 ?
                            <Pokemon pokemon ={prevPokemon} key={prevPokemon.name}/>:
                            <div></div>
                            } </div>
                        <div className='pokemon-data-card'>
                            <div className='pokemon-name'><h1>{pokemonData.name} #{pokemonData.id}</h1></div>
                            <div className='data-container'>
                                <div className='top-cointaner'>
                                    <div className='container-left'><img 
                                    src={pokemonData.sprites.front_default}
                                    alt={pokemonData.name}
                                    className='pokemon-img'
                                    /></div>
                                    <div className='container-right'>
                                        <ul className='attribure-grid'>
                                            <li>
                                                <span>Altura</span>
                                                <span>{pokemonData.height}</span>
                                            </li>
                                            <li>
                                                <span>Habilidad</span>
                                                <span>{pokemonData.abilities[0].ability.name}</span>
                                            </li>
                                            <li>
                                                <span>Peso</span>
                                                <span>{pokemonData.weight}</span>
                                            </li>
                                            <li>
                                                <span>Typo</span>
                                                <span>{pokemonData.types[0].type.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='mid-container'>
                                    <div className='type-container'>
                                        <div>Tipo Principal:</div>
                                        <div className='type-main'><div className='pokemon-type-text'><div className={typeData.name}>{typeData.name}</div></div></div>
                                        <div>Debilidad contra:</div>
                                        <div className='type-weak'>{typeData.damage_relations.double_damage_from.map((type, idx)=>{
                                            return <div key={idx} className='pokemon-type-text'><div className={type.name}>{type.name}</div></div>
                                        })}</div>
                                    </div>
                                </div>
                                <div className='stats-container'>
                                    {pokemonData.stats.map((stat)=>{
                                        return(
                                            <PokemonStats
                                            stat={stat}
                                            key={stat.stat.name}
                                        />
                                        )
                                    })}
                                </div>
                            </div>
                            <Link to={"/"}> <h2>Home</h2> </Link>
                            <button onClick={() => navigate(-1)}>go back</button>
                        </div>
                        <div>{pokemonData.id < 898 ?
                            <Pokemon pokemon ={nextPokemon} key={nextPokemon.name}/>:
                            <div></div>
                            }
                        </div> 
                    </div>
                }
            </div> 
        </div>
    )
}

export default PokemonData
