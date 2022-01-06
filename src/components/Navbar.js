import React from 'react'
import  '../style/Navbar.css'

const Navbar = () =>{
    
    let logoUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"

    return(
        <nav>
            <div/>
            <div>
                <img src={logoUrl} alt='pokeapi-logo' className='navbar-img'/>
            </div>
            <div>
                ♥
            </div>
        </nav>
    )
}

export default Navbar