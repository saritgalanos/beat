import { useEffect, useState } from "react"
import { IoAdd, IoLibraryOutline, IoArrowForwardOutline } from "react-icons/io5"
import { stationService } from "../services/station.service"
import { StationPreview } from "../cmps/StationPreview"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"
import { loadStations, saveStation } from "../store/actions/station.actions"
import { useNavigate } from "react-router"



export function YourLibrary() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
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

    if (!stations) return <div>Loading...</div>
    return (
        <div className="your-library">
            <div className="lib-header">
                <div className="nav-control-item">
                    <IoLibraryOutline className='nav-control-icon' />
                    <div className="txt">Your Library</div>
                </div>
                <div className='controls'>
                    <IoAdd className='add-icon' onClick={onAddNewStation} />
                    <IoArrowForwardOutline className='add-icon' />
                </div>
            </div>

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
