import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './List.css'
import { useDispatch } from "react-redux"
import Video from './Video'
import VideoForm from './VideoForm'
import VideoFormUpdate from './VideoFormUpdate'
import { saveVideos } from '../sessionSlice'

//HEROKU
// const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
const SERVER = 'http://localhost:8081'

function VideosList () {
  const { id } = useParams()
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(0)
  const dispatch = useDispatch()

  const getVideos = async () => {
    const response = await fetch(`${SERVER}/favouriteLists/${id}/videos`)
    const data = await response.json()
    setVideos(data)
  }

  const addVideo = async (video) => {
    await fetch (`${SERVER}/favouriteLists/${id}/videos`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(video)
    })
    getVideos()
  }

  const deleteVideo = async () => {
    await fetch (`${SERVER}/favouriteLists/${id}/videos/${selectedVideo}`, {
      method: 'delete',
    })
    setSelectedVideo(0)
    getVideos()
  }

  const updateVideo = async (video) => {
    await fetch (`${SERVER}/favouriteLists/${id}/videos/${selectedVideo}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(video)
    })
    getVideos()
  }

  useEffect(() => {
    getVideos()
  }, [])

  useEffect(()=>{
    dispatch(saveVideos(videos))
  }, [videos])

  return (
    <div className='list'>
      <VideoForm onAdd={addVideo}/>
      {
        videos.map(e => <Video key={e.id} item={e} onSelect={()=>setSelectedVideo(e.id)}/>)
      }
      {
          selectedVideo !==0 ? 
            <div>
                <input type="button" value="delete" onClick={deleteVideo}/>
                <VideoFormUpdate onUpdate={updateVideo}/>
            </div>
          : <></>
      } 

    </div>
  )
}

export default VideosList