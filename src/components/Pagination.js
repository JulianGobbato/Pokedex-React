import React from 'react'
import '../style/Pagination.css'

const Pagination = (props) =>{
    
    const {onLeftClick, onRightClick, page, totalPages} = props

    return (
        <div className='pagination'>
            <button onClick={onLeftClick}> &lt; </button>
            <div>{page} de {totalPages}</div>
            <button onClick={onRightClick}> &gt; </button>
        </div>
    )
}

export default Pagination