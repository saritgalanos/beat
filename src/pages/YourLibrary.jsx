import { useEffect, useState, useRef } from "react"
import { IoAdd, IoLibraryOutline, IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5"
import { stationService } from "../services/station.service"
import { StationPreview } from "../cmps/StationPreview"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"
import { loadStations, saveStation } from "../store/actions/station.actions"
import { useNavigate } from "react-router"
import { ThreeDots } from "react-loader-spinner"
import { useResizeObserver } from "../customHooks/useResizeObserver"




export function YourLibrary({ onNavWidth }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [isLibMaxSize, setLibMaxSize] = useState(false)
    const [ref, size] = useResizeObserver()

    const navigate = useNavigate()
    useEffect(() => {
        loadStations()
    }, [])

    async function onAddNewStation(ev) {
        const stationToAdd = stationService.getEmptyStation(stations)
        try {
            const stationAdded = await saveStation(stationToAdd)
            setTimeout(() => {
                navigate(`/${stationAdded._id}`)
            }, 10);

        } catch (err) {
            console.log('Had issues adding station', err);
        }
    }

    function onLibrary() {
        console.log("width:" + size.width)
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


    if (!stations) return
    <ThreeDots visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" />
    const navClass = size.width > 100 ? "nav-open" : 'nav-closed'

    return (
        <div className={`your-library ${navClass}`} ref={ref}>
            <div className="lib-header">
                <div className="nav-control-item">
                    <IoLibraryOutline className='nav-control-icon' onClick={onLibrary} />
                    <div className={`txt ${navClass}`}>Your Library</div>
                </div>
                <div className={`controls ${navClass}`}>
                    <IoAdd className='add-icon' onClick={onAddNewStation} />
                    {(!isLibMaxSize) ? <IoArrowForwardOutline className='add-icon' onClick={onLeftArrow} /> :
                        <IoArrowBackOutline className='add-icon' onClick={onRightArrow} />}
                </div>
            </div>

            <ul className="stations-area">
                <div className="stations">
                    {stations.map(station =>
                        <li key={station._id}>

                            <StationPreview station={station} displayOn={"library"} libOpen={size.width > 100} />

                        </li>
                    )}
                </div>
            </ul>
        </div>
    )
}


