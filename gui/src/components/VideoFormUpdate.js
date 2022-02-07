import { useState } from 'react'
import './VideoForm.css'

function VideoFormUpdate (props) {
  const { onUpdate } = props
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const updateVideo = (evt) => {
    console.warn('called')
    onUpdate({
      description,
      title,
      url
    })
  }

  return (
    <div className='video-form'>
      <p>Update video form</p>
      <div className='description'>
        <input type='text' placeholder='description' onChange={(evt) => setDescription(evt.target.value)} />
      </div>
      <div className='title'>
        <input type='text' placeholder='title' onChange={(evt) => setTitle(evt.target.value)} />
      </div>
      <div className='url'>
        <input type='text' placeholder='url' onChange={(evt) => setUrl(evt.target.value)} />
      </div>
      <div className='add'>
        <input type='button' value='update' onClick={updateVideo} />
      </div>
    </div>
  )
}

export default VideoFormUpdate