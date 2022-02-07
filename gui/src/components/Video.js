import './Video.css'

function Video (props) {
    const { item, onSelect } = props

    return (
      <div className='video' onClick={() => onSelect(item.id)}>
        <div className='description'>
          {item.description}
        </div>
        <div className='title'>
          {item.title}
        </div>
        <div className='url'>
          {item.url}
        </div>
      </div>
    )
}

export default Video