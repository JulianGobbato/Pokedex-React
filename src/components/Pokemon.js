import React, {useContext} from 'react'
import FavoriteContext from '../context/favoritesContext'
import { Link } from 'react-router-dom';
import '../style/Pokemon.css'

const Pokemon = (props) =>{
    const { pokemon } = props
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)
    const blackHeart = "🖤"
    const redHeart = "❤️"
    const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart

    const clickHeart = (e)=>{
        e.preventDefault()
        updateFavoritePokemons(pokemon.name)
    }

    return(
        <div className='pokemon-card'>
            <div className='pokemon-img-container'>
                <Link to={`/${pokemon.name}`}>
                    <img 
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className='pokemon-img'
                    />
                </Link>
            </div>
            <div className='card-body'>
                <div className='card-top'>
                    <Link to={`/${pokemon.name}`}>
                        <h3>{pokemon.name}</h3>
                    </Link>
                    <div>#{pokemon.id}</div>
                </div>
                <div className='card-bottom'>
                    <div className='pokemon-type'>
                        {pokemon.types.map((type, idx) => {
                            return <div key={idx} className={type.type.name}><div className='pokemon-type-text'>{type.type.name}</div></div>
                        })}
                    </div>
                    <button onClick={clickHeart}><div className='pokemon-favorite'>{heart}</div></button>
                </div>
            </div>
        </div>
    )
}

export default Pokemon