export const searchPokemon = async (pokemon) =>{
    if (typeof(pokemon) !== "number"){
        pokemon = pokemon.toLowerCase()
    }
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(err){}
}

export const getPokemons = async (limit, offset) =>{
    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(err){}
}

export const getPokemonData = async (url) =>{
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(err){}
}

export const getTypeData = async (type) =>{
    try{
        let url = `https://pokeapi.co/api/v2/type/${type}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(err){}
}