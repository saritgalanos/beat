import { useEffect, useState } from "react"
import { IoAdd, IoLibraryOutline, IoArrowForwardOutline } from "react-icons/io5"
import { stationService } from "../services/station.service"
import { StationPreview } from "../cmps/StationPreview"




export function YourLibrary() {
    const [stations, setStations] = useState(null)

    useEffect(() => {
        if (!stations) {
            const stations = stationService.getStations()
            setStations(stations)
        }
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
