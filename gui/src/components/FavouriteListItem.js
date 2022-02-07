import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FavouriteListItem.css'

function FavouriteListItem (props) {
    const { item, onSelect , onDelete } = props
    const navigate = useNavigate()
    // const [btnUpdate, setBtnUpdate] = useState(false)

    // useEffect(()=>{
    //   onUpdate(true)
    // }, [btnUpdate]) 
    const handleClick = ()=>{
      navigate(`/${item.id}/videos`)
    }

    return (
      <div className='list-item' onClick={() => onSelect(item.id)}>
        <div className='description'>
          {item.description}
        </div>
        <div className='date'>
          {item.date}
        </div>
        <div>
          {/* <input type="button" value="update" onClick={()=>{
            console.log("BBTN")
            setBtnUpdate(true)}}/> */}
          <input type="button" value="videos" onClick={handleClick}/>
          <input type="button" value="delete" onClick={()=>onDelete(item.id)}/>
        </div>
      </div>
    )
}

export default FavouriteListItem