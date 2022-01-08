import React, {useState} from 'react'
import '../style/Searchbar.css'

const Searchbar = (props) =>{

    const {onSearch} = props

    const [search , setSearch] = useState('')
    
    const onChange = (e)=>{
        setSearch(e.target.value)
        if (e.target.value.lenght === 0) {
            setSearch(null)
        }
    }
    const onClick = async () => { 
        onSearch(search)
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
        </div>
    )
}

export default Searchbar