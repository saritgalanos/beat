import { useContext, useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { spotifyService } from "../services/spotify.service"
import { StationPreview } from "../cmps/StationPreview"
import { useSelector } from "react-redux"
import { loadStations } from "../store/actions/station.actions"
import { categoryService } from "../services/category.services"
import { ThreeDots } from "react-loader-spinner"
import { stationService } from "../services/station.service"
import { UserContext } from "../contexts/UserContext"

const POP = '0JQ5DAqbMKFEC4WFtoNRpw'

export function HomePage() {

    const userStations = useSelector(storeState => storeState.stationModule.stations)

    const [suggestedStations, setSuggestedStations] = useState(null)
    const [category, setCategory] = useState(null)
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)


    useEffect(() => {
        const filterBy = stationService.getDefaultFilter()
        const pop = categoryService.getCategory(POP)
        setCategory(pop)
        filterBy.categoryId = pop.id
        loadCategoryStations(filterBy)

    }, [])

    async function loadCategoryStations(filterBy) {
        try {
            const categoryStations = await stationService.query(filterBy)
            setSuggestedStations(categoryStations)

        } catch (error) {
            console.log('loadCategoryStations failed:', error)
        }
    }

    if (!userStations || !suggestedStations) return (
        <div className="page-center">
            <ThreeDots visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" />
        </div>)




    const stationsToDisplay = userStations.slice(0, 6);
    const BEAT_BG = "#121212"
    const baseColor = "#232324"
    const gradientStyle = {
        background: `linear-gradient(${baseColor} 50px, ${BEAT_BG} 400px,  ${BEAT_BG})`
    }

    return (

        <div className='home-page main'>
            <BeatHeader isSearch={false} />
            <div className="main-content">
                Good Evening
            </div>

            {loggedinUser && <ul className="stations-area">
                <div className="stations">
                    {stationsToDisplay.map(station =>
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"homepage"} />
                        </li>
                    )}
                </div>
            </ul>}

            <ul className="suggested-area">
                <div className="stations">
                    {suggestedStations.map(station =>
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"category"} />
                        </li>
                    )}
                </div>
            </ul>




        </div>
    )
}
