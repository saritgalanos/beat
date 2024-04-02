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

export function YourLibrary({ onNavWidth }) {
    const stations = useSelector(storeState => storeState.stationModule.userStations)
    const likedSongsStation = useSelector(storeState => storeState.stationModule.likedSongsStation)
    const likedStations = useSelector(storeState => storeState.stationModule.userLikedStations)
    const [isLibMaxSize, setLibMaxSize] = useState(false)
    const [ref, size] = useResizeObserver()

    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    const navigate = useNavigate()

    async function onAddNewStation(ev) {
        const stationToAdd = stationService.getEmptyStation(stations, loggedinUser)

        try {
            const stationAdded = await saveStation(stationToAdd)
            setTimeout(() => {
                navigate(`/${stationAdded._id}`)
                showSuccessMsg('Added to your library.')
            }, 10);

        } catch (err) {
            console.log('Had issues adding station', err);
        }
    }

    function onLibrary() {
        const navWidthToSet = size.width < 100 ? 'narrow-wide-lib' : 'normal'
        onNavWidth(navWidthToSet)
    }

    function onLeftArrow() {
        setLibMaxSize(true)
        onNavWidth("wide-lib")


    }

    function onRightArrow() {
        setLibMaxSize(false)
        onNavWidth("normal")
    }


    if (!stations && !likedStations && likedSongsStation?.songs?.length === 0) return (
    <ThreeDots visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" /> )

    const navClass = size.width > 100 ? "nav-open" : 'nav-closed'
    
    return (
        <div className={`your-library ${navClass}`} ref={ref}>
            <div className="lib-header">
                <div className="nav-control-item">
                    <VscLibrary className='library-icon nav-control-icon ' onClick={onLibrary} />
                    <div className={`txt ${navClass}`}>Your Library</div>
                </div>
                {loggedinUser && <div className={`controls ${navClass}`}>
                    <IoAdd className='add-icon' onClick={onAddNewStation} />
                    {(!isLibMaxSize) ? <IoArrowForwardOutline className='add-icon' onClick={onLeftArrow} /> :
                        <IoArrowBackOutline className='add-icon' onClick={onRightArrow} />}
                </div>}
            </div>

            {!loggedinUser && <div className='no-user-message '>
                <div className='fs16 fw700'>Create you first playlist</div>
                <div className='fs14 fw400'>Log in to create and share playlists</div>
                <div className='login fs16 fw700' onClick={() => navigate('/login')}>Log in</div>
            </div>}

            {loggedinUser &&
                <ul className="stations-area">
                    <div className="stations">
                        {likedSongsStation?.songs?.length > 0 &&
                            <li key={likedSongsStation._id}>
                                <StationPreview station={likedSongsStation} displayOn={"library"} libOpen={size.width > 100} />
                            </li>}

                        {stations && stations.map(station =>
                            <li key={station._id}>
                                <StationPreview station={station} displayOn={"library"} libOpen={size.width > 100} />
                            </li>
                        )}
                         {likedStations && likedStations.map(station =>
                            <li key={station._id}>
                                <StationPreview station={station} displayOn={"library"} libOpen={size.width > 100} />
                            </li>
                        )}
                    </div>
                </ul>}
        </div>
    )
}
 

