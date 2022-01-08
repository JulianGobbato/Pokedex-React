import React, {useContext} from 'react'
import FavoriteContext from '../context/favoritesContext'
import  '../style/Navbar.css'

const Navbar = () =>{
    
    const {favoritePokemons} = useContext(FavoriteContext)

    let logoUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"

    return(
        <nav>
            <div/>
            <div>
                <img src={logoUrl} alt='pokeapi-logo' className='navbar-img'/>
            </div>
            <div>
                ❤️{favoritePokemons.length}
            </div>
        </nav>
    )
}

export default Navbar