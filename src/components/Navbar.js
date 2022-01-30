import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import FavoriteContext from '../context/favoritesContext'
import  '../style/Navbar.css'

const Navbar = () =>{
    
    const {favoritePokemons} = useContext(FavoriteContext)

    let logoUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"

    return(
        <nav>
            <div/>
            <Link to={"/"}>
            <div>
                <img src={logoUrl} alt='pokeapi-logo' className='navbar-img'/>
            </div>
            </Link>
            <Link to={"favorites"}>
            <div>
                ❤️{favoritePokemons.length}
            </div>
            </Link>
        </nav>
    )
}

export default Navbar