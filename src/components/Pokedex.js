import React from "react";
import '../style/Pokedex.css'
import Pokemon from './Pokemon'
import Pagination from "./Pagination";

const Pokedex = (props) =>{
    
    const {pokemons, page, setPage, total, loading} = props

    const lastPage = () =>{
        const lastPage = Math.max(page - 1, 0)
        setPage(lastPage)
    }
    const nextPage = () =>{
        const nextPage = Math.min(page + 1, total)
        setPage(nextPage)
    }

    return(
        <div>
            <div className="header">
                <h1>Pokedex</h1>
                <Pagination
                page = {page+1}
                totalPages = {150}
                onLeftClick={lastPage}
                onRightClick={nextPage}
                />
            </div>
            { loading ?
                <div> Cargando pokemones </div>
                :
                <div className="pokedex-grid">
                    {pokemons.map((pokemon, idx) => {
                        return(
                            <Pokemon pokemon ={pokemon} key={pokemon.name}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Pokedex