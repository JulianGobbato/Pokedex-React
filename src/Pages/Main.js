import React, { useState, useEffect } from "react";
import Pokedex from "../components/Pokedex";
import Searchbar from "../components/Searchbar";
import { getPokemons, getPokemonData, searchPokemon } from "../api";


const Main = () => {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [searching, setSearching] = useState(false);
    const [switchingPage, setSwitchingPage] = useState(false);

    const fetchPokemons = async () => {
        setLoading(true);
        try {
            const data = await getPokemons(30, 30 * page);
            console.log(data)
            const promises = data.results.map(async (pokemon) => {
                return await getPokemonData(pokemon.url);
            });
            const results = await Promise.all(promises);
            setPokemons(results);
            setTotal(Math.ceil(data.count / 30));
            setLoading(false);
            setSwitchingPage(false);
            setNotFound(false);
        } catch (err) {}
    };


    useEffect(() => {
        if (!searching) {
            fetchPokemons();
        }
    }, [page]);


    const onSearch = async (pokemon) => {
        if (!pokemon) {
            return fetchPokemons();
        }
        setLoading(true);
        setNotFound(false);
        setSearching(true);
        const result = await searchPokemon(pokemon);
        if (!result) {
            setNotFound(true);
            return;
        } else {
            setPokemons([result]);
            setPage(0);
            setTotal(1);
        }
        setLoading(false);
        setSearching(false);
    };

    return (
            <div>
                <Searchbar onSearch={onSearch} />
                {notFound ? (
                    <div>Pokemon not found</div>
                ) : (
                    <Pokedex
                        pokemons={pokemons}
                        page={page}
                        setPage={setPage}
                        total={total}
                        loading={loading}
                        setSwitchingPage={setSwitchingPage}
                        switchingPage={switchingPage}
                    />
                )}
            </div>
    );
};

export default Main;
