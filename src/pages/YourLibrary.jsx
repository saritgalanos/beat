import { useEffect, useState } from "react"
import { IoAdd, IoLibraryOutline, IoArrowForwardOutline } from "react-icons/io5"
import { stationService } from "../services/station.service"
import { StationPreview } from "../cmps/StationPreview"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"
import { loadStations } from "../store/actions/station.actions"




export function YourLibrary() {
    //const [stations, setStations] = useState(null)
    const stations = useSelector(storeState => storeState.stationModule.stations)
    useEffect(() => {
        loadStations()
    }, [])

    if (!stations) return <div>Loading...</div>
    return (
        <div className="your-library">
            <header>
                <div className="nav-control-item">
                    <IoLibraryOutline className='nav-control-icon' />
                    Your Library
                </div>
                <div>
                    <IoAdd className='add-icon' />
                    <IoArrowForwardOutline className='add-icon' />

                </div>
            </header>

            <ul className="stations">
                {stations.map(station =>
                    <li key={station._id}>

                        <StationPreview station={station} />

                    </li>
                )}
            </ul>



        </div>
    )
}
