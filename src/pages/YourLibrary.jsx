import { useEffect, useState } from "react"
import { IoAdd, IoLibraryOutline, IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5"
import { stationService } from "../services/station.service"
import { StationPreview } from "../cmps/StationPreview"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"
import { loadStations, saveStation } from "../store/actions/station.actions"
import { useNavigate } from "react-router"
import { ThreeDots } from "react-loader-spinner"




export function YourLibrary({ onNavWidth, isWide }) {
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

    if (!stations)  return
            <ThreeDots visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" />
       
    return (
        <div className="your-library">
            <div className="lib-header">
                <div className="nav-control-item">
                    <IoLibraryOutline className='nav-control-icon' onClick={onNavWidth}/>
                    <div className="txt">Your Library</div>
                </div>
                <div className='controls'>
                    <IoAdd className='add-icon' onClick={onAddNewStation} />
                    {(!isWide) ? <IoArrowForwardOutline className='add-icon' onClick={onNavWidth} /> :
                        <IoArrowBackOutline className='add-icon' onClick={onNavWidth} />}
                </div>
            </div>

            <ul className="stations-area">
                <div className="stations">
                    {stations.map(station =>
                        <li key={station._id}>

                            <StationPreview station={station} displayOn={"library"}/>

                        </li>
                    )}
                </div>
            </ul>



        </div>
    )
}


