import './FavouriteListImport.css'

function FavouriteListImport (props) {
    const { item } = props

    const listVideos = item.videos.map((video) =>
        <li >
            <div className='videos-info'>
                {video.description}
            </div>
            <div className='videos-info'>
                {video.title}
            </div>
            <div className='videos-info'>
                {video.url}
            </div>
        </li>
    )
    // console.log(listCrew)

    return (
      <div className='favourite-list'>
        <div className='description'>
          {item.description}
        </div>
        <div className='date'>
          {item.date}
        </div>
        <ul className='videos'>
          {listVideos}
        </ul>
      </div>
    )
}

export default FavouriteListImport