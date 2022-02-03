import React, { useEffect } from 'react';

const PokemonStats = (props) => {
    const {stat} = props
    const statBarValue = document.getElementsByClassName(`${stat.stat.name}-bar-value`)
    
    useEffect(()=>{
        statBarValue[0].style.width= `${stat.base_stat*100/255}%`
        statBarValue[0].style.position= 'absolute'
        statBarValue[0].style.height= '100%'
        statBarValue[0].style.backgroundColor= '#4CAF50'
    })

    return (
        <div className='stat-container'>
            <div className='stat-name'>{stat.stat.name}</div>
            <div className='stat-bar'>
                <div className={`${stat.stat.name}-bar-value`}></div>
            </div>
            <div className='stat-value'>{stat.base_stat}</div>
        </div>
    )
};

export default PokemonStats;
