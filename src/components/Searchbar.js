import React, {useState} from 'react'
import {searchPokemon} from '../api.js'
import '../style/Searchbar.css'

const Searchbar = () =>{

    const [search , setSearch] = useState('')
    const [pokemon, setPokemon]= useState()
    
    const onChange = (e)=>{
        setSearch(e.target.value)
    }
    const onClick = async () => { 
        const data = await searchPokemon(search)
        setPokemon(data)
    }

    return(
        <div className='searchbar-container'>
            <div className='searchbar'>
                <input 
                placeholder='Buscar Pokemon'
                onChange={onChange}
                />
            </div>
            <div className='searchbar-btn'>
                <button onClick={onClick}>Buscar</button>
            </div>
            <div>
                {
                    pokemon &&
                    <div>
                        <div>Nombre: {pokemon.nombre}</div>
                        <img src={pokemon.sprites.front_default}></img>
                    </div>
                }
            </div>
        </div>
    )
}

export default Searchbar