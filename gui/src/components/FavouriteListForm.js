import { useState } from 'react'
import './FavouriteListForm.css'

function FavouriteListForm (props) {
  const { onAdd } = props
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const addFavouriteList = (evt) => {
    console.warn('called')
    onAdd({
      description,
      date
    })
  }

  return (
    <div className='list-form'>
      <p>Add favourite list form</p>
      <div className='description'>
        <input type='text' placeholder='description' onChange={(evt) => setDescription(evt.target.value)} />
      </div>
      <div className='date'>
        <input type='date' onChange={(evt) => setDate(evt.target.value)} />
      </div>
      <div className='add'>
        <input type='button' value='add' onClick={addFavouriteList} />
      </div>
    </div>
  )
}

export default FavouriteListForm