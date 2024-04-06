import { useContext, useEffect, useState } from "react"
import { IoAdd, IoLibraryOutline, IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5"
import { stationService } from "../services/station.service"
import { StationPreview } from "../cmps/StationPreview"
import { useSelector } from "react-redux"
import { saveStation } from "../store/actions/station.actions"
import { useNavigate } from "react-router"
import { ThreeDots } from "react-loader-spinner"
import { useResizeObserver } from "../customHooks/useResizeObserver"
import { UserContext } from "../contexts/UserContext"
import { showSuccessMsg } from "../services/event-bus.service"
import { VscLibrary } from "react-icons/vsc"


export function YourLibraryMobile() {
    const stations = useSelector(storeState => storeState.stationModule.userStations)
    const likedSongsStation = useSelector(storeState => storeState.stationModule.likedSongsStation)
    const likedStations = useSelector(storeState => storeState.stationModule.userLikedStations)
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    const navigate = useNavigate()

    if (!stations && !likedStations && likedSongsStation?.songs?.length === 0) return (
    <ThreeDots visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" /> )

    
    
    return (
        <div className='your-library-mobile main'>
            <h1>
                Your Library
                </h1>
            
            {!loggedinUser && <div className='no-user-message '>
                <div className='fs16 fw700'>Create your first playlist</div>
                <div className='fs14 fw400'>Log in to create and share playlists</div>
                <div className='login fs16 fw700' onClick={() => navigate('/login')}>Log in</div>
            </div>}

            {loggedinUser &&
                <ul className="stations-area">
                    <div className="stations">
                        {likedSongsStation?.songs?.length > 0 &&
                            <li key={likedSongsStation._id}>
                                <StationPreview station={likedSongsStation} displayOn={"library"} libOpen={true} />
                            </li>}

                        {stations && stations.map(station =>
                            <li key={station._id}>
                                <StationPreview station={station} displayOn={"library"} libOpen={true} />
                            </li>
                        )}
                         {likedStations && likedStations.map(station =>
                            <li key={station._id}>
                                <StationPreview station={station} displayOn={"library"} libOpen={true} />
                            </li>
                        )}
                    </div>
                </ul>}
        </div>
    )
}
 

