import React from "react";
import '../style/Pokedex.css'
import Pokemon from './Pokemon'
import Pagination from "./Pagination";

const Pokedex = (props) =>{
    
    const {pokemons, page, setPage, total, loading, setSwitchingPage, switchingPage} = props

    const lastPage = () =>{
        setSwitchingPage(true)
        const lastPage = Math.max(page - 1, 0)
        setPage(lastPage)
    }
    const nextPage = () =>{
        setSwitchingPage(true)
        const nextPage = Math.min(page + 1, total)
        setPage(nextPage)
    }

    return(
        <div>
            <div className="header">
                <h1>Pokedex</h1>
                { loading && !switchingPage ? 
                    <div></div>
                    :
                    <Pagination
                    page = {page+1}
                    totalPages = {total}
                    onLeftClick={lastPage}
                    onRightClick={nextPage}
                    />
                }
            </div>
            { loading ?
                <div> Cargando pokemones </div>
                :
                <div className="pokedex-grid">
                    {pokemons.map((pokemon) => {
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