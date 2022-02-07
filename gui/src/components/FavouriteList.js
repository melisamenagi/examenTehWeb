import { useEffect, useState } from 'react'
import FavouriteListDetails from './FavouriteListDetails'
import FavouriteListForm from './FavouriteListForm'
import FavouriteListItem from './FavouriteListItem'
import FavouriteListFormUpdate from './FavouriteListFormUpdate'
import './List.css'
// import MovieImport from './MovieImport'
import { useSelector } from "react-redux"
import { store } from "../store"
import { useDispatch } from "react-redux"
// import { saveMovies } from '../sessionSlice'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import FavouriteListImport from './FavouriteListImport'
import { saveFavouriteListsShown } from '../sessionSlice'

//HEROKU
// const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
const SERVER = 'http://localhost:8081'

function FavouriteList (props) {
  const [favouriteLists, setFavouriteLists] = useState([])
//   let moviesShown=[]
//   const [favouriteListsShown, setFavouriteListsShown] = useState([])
  const [selected, setSelected] = useState(0)
  const [btnExport, setBtnExport] = useState(false)
  const [btnExportView, setBtnExportView] = useState(false)
//   const [btnUpdate, setBtnUpdate] = useState(false)
  const videos = useSelector(state => store.getState().videos)
  const dispatch = useDispatch()
  const favouriteListsShown = useSelector(state => store.getState().favouriteListsShown)

  const getFavouriteLists = async () => {
    const response = await fetch(`${SERVER}/favouriteLists`)
    const data = await response.json()
    setFavouriteLists(data)
  }

  const addFavouriteList = async (favourite) => {
    await fetch (`${SERVER}/favouriteLists`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favourite)
    })
    getFavouriteLists()
  }

  const deleteFavouriteList = async (id) => {
    await fetch (`${SERVER}/favouriteLists/${id}`, {
      method: 'delete',
    })
    setSelected(0)
    getFavouriteLists()
  }

  const updateFavouriteList = async (favouriteList) => {
    // const bodyInfo = {
    //     description: favouriteList.description,
    //     date: favouriteList.date
    // }
    await fetch (`${SERVER}/favouriteLists/${selected}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favouriteList)
    })
    getFavouriteLists()
  }

  const handleImport = async () => {
    // console.log(movies)
    // console.log(crewMembers)
    let bodyInfo = favouriteLists.map(f => {
        let videosInfo = videos.filter(v => v.favouriteListId=== f.id)
        const favouriteList ={
            id: f.id,
            description : f.description,
            date: f.date,
            videos: videosInfo
        }
        return favouriteList
    })
    // console.log(bodyInfo)
    console.log(JSON.stringify(bodyInfo))
    await fetch (`${SERVER}/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyInfo)
        // body: bodyInfo
    })
  }

//   const getFavouriteListsShown = async () => {
//     const response = await fetch(`${SERVER}/favouriteLists`)
//     const data = await response.json()
//     setFavouriteListsShown(data)
//   }

  const handleExport = async () => {
    const response = await fetch(`${SERVER}/`)
    const data = await response.json()
    // setMoviesImport(data)
    // moviesShown = data
    dispatch(saveFavouriteListsShown(data))
    // console.log(data)
    // console.log(moviesShown)
    // setFavouriteListsShown(data)
    // getFavouriteListsShown()
    setBtnExport(true)
  }

    // const handleCallback = (childData) =>{
    //     setCrewMembers(childData)
    //     console.log(crewMembers)
    // }

  useEffect(() => {
    getFavouriteLists()
  }, [])

//   useEffect(()=>{
//     setBtnExportView(true)
//   }, [btnExport])

  const handleSort = async () => {
    const response = await fetch(`${SERVER}/favouriteLists?sortBy=description`)
    const data = await response.json()
    setFavouriteLists(data)
  }

  const [filter,setFilter] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filter2Value, setFilter2Value] = useState('')
  const options = [{
    label: 'description',
    value: 'description'
  }, {
    label: 'date',
    value: 'date'
  }, {
    label: 'description and date',
    value: 'both'
  }]

  const handleFilter = async () => {
    if(filter !== 'both'){
        const response = await fetch(`${SERVER}/favouriteLists?${filter}=${filterValue}`)
        const data = await response.json()
        setFavouriteLists(data) 
    }else {
        const response = await fetch(`${SERVER}/favouriteLists?description=${filterValue}&date=${filter2Value}`)
        const data = await response.json()
        setFavouriteLists(data) 
    }
  }

  const [favouriteListsPagination, setFavouriteListsPagination] = useState(favouriteLists)
  const [page, setPage] = useState(0)
  const [first, setFirst] = useState(0)
  const handlePageChange = (evt) => {
    setPage(evt.page)
    setFirst(evt.page * 2)
  }

  useEffect(async () => {
    const response = await fetch(`${SERVER}/favouriteLists?page=${page}&pageSize=${2}`)
    const data = await response.json()
    setFavouriteListsPagination(data)
  }, [page])

  return (
        <div className='list'>{
            selected === 0 
            ? (
                <>
                {
                    btnExport ? 
                        <>{
                            favouriteListsShown.map(e => <FavouriteListImport key={e.id} item={e}/>)
                        } </>
                    : <> {
                        favouriteLists.map(e => <FavouriteListItem key={e.id} item={e} onSelect={()=>setSelected(e.id)} onDelete={id => deleteFavouriteList(id)} />)
                    } </>
                }
                    <FavouriteListForm onAdd={addFavouriteList}/>
                    {/* {btnUpdate ? <FavouriteListForm onAdd={updateFavouriteList}/> : null} */}
                    <div className='add'>
                        <input type="button" value="Import" onClick={handleImport}/>
                        <input type="button" value="Export" onClick={handleExport}/>
                        <input type="button" value="Sort by description" onClick={handleSort}/>
                        <select onChange={(evt) => setFilter(evt.target.value)}>
                        {
                            options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                            ))
                        }
                        </select>
                        {
                            filter === 'both' ? 
                                <>
                                    <input type='text' placeholder='description value' onChange={(evt) => setFilterValue(evt.target.value)} />
                                    <input type='date' onChange={(evt) => setFilter2Value(evt.target.value)} />
                                </>
                            : <>
                                {
                                    filter === 'description' ? <>
                                            <input type='text' placeholder='description' onChange={(evt) => setFilterValue(evt.target.value)} />
                                        </>:<>
                                            <input type='date' onChange={(evt) => setFilterValue(evt.target.value)} />
                                        </>
                                } 
                              </>
                            
                        }
                        <input type="button" value="Filter" onClick={handleFilter}/>
                    </div>
                    <div>
                        <h2>Pagination table</h2>
                        <DataTable 
                            value={favouriteListsPagination}
                            paginator
                            onPage={handlePageChange}
                            first={first}
                            rows={2}
                        >
                            <Column header='Description' field='description'/>
                            <Column header='Date' field='date' />
                        </DataTable>
                    </div>
                </>
            )
            : (
                <div className='details'>
                    <FavouriteListDetails item={favouriteLists.find(e=>e.id === selected)} onCancel={()=> setSelected(0)} />
                    <FavouriteListFormUpdate onUpdate={updateFavouriteList}/> 
                </div>
            )
        }
        </div>
  )
}

export default FavouriteList
