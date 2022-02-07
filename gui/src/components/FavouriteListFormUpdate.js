import { useState } from 'react'
import './FavouriteListForm.css'

function FavouriteListFormUpdate (props) {
  const { onUpdate } = props
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const addFavouriteList = (evt) => {
    console.warn('called')
    onUpdate({
      description,
      date
    })
  }

  return (
    <div className='list-form'>
      <p>Update favourite list form</p>
      <div className='description'>
        <input type='text' placeholder='description' onChange={(evt) => setDescription(evt.target.value)} />
      </div>
      <div className='date'>
        <input type='date' onChange={(evt) => setDate(evt.target.value)} />
      </div>
      <div className='add'>
        <input type='button' value='update' onClick={addFavouriteList} />
      </div>
    </div>
  )
}

export default FavouriteListFormUpdate