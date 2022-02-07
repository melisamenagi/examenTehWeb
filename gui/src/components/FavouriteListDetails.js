import { useState } from 'react'

function FavouriteListDetails (props) {
    const {item, onCancel, onDelete} = props
    // const [crewMembers, setCrewMembers] = useState([])

    // const handleChildCallback = (childData) =>{
    //     setCrewMembers(childData)
    //     // parentCallback(childData)
    //     console.log(childData)
    // }

    // useEffect(()=>{
    //     parentCallback(crewMembers)
    //   }, [crewMembers])

    return (
        <div>
            <h1>{item.description}</h1>
            <h3>{item.date}</h3>
            <div>
                <input type="button" value="back" onClick={()=>onCancel()}/>
            </div>
            {/* <div style={{marginTop: "80px"}}>
                <h1>Crew Members</h1>
                <CrewMemberList movieId={item.id} />
            </div> */}
            {/* <div>
                <input type="button" value="child callback" onClick={handleChildCallback}/>
            </div> */}
        </div>
    )
}

export default FavouriteListDetails