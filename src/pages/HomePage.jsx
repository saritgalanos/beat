import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { spotifyService } from "../services/spotify.service"
import { StationPreview } from "../cmps/StationPreview"
import { useSelector } from "react-redux"
import { loadStations } from "../store/actions/station.actions"


export function HomePage() {

    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations()
    }, [])
    if (!stations) return <div>Loading...</div>
    //filter stations for display and take up to 6
    //const filteredLimitedItems = stations.filter(station => item.isActive).slice(0, 6)
    const stationsToDisplay = stations.slice(0, 6);

    const BEAT_BG = "#121212"
    const baseColor = "#232324"
    const gradientStyle = {
        background: `linear-gradient(${baseColor} 50px, ${BEAT_BG} 400px,  ${BEAT_BG})`
    }

    return (
        <div className='home-page main' style={gradientStyle}>
            <BeatHeader isSearch={false} bgColor={baseColor} className="dynamic-display" />
            <div className="main-content">
                Good Evening
            </div>

            <ul className="stations-area">
                <div className="stations">
                    {stationsToDisplay.map(station =>
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"homepage"} />
                        </li>
                    )}
                </div>
            </ul>



        </div>
    )
}
