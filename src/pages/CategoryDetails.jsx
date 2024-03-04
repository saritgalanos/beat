import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { spotifyService } from "../services/spotify.service"
import { useNavigate, useParams } from "react-router"
import { categoryService } from "../services/category.services"
import { StationPreview } from "../cmps/StationPreview"
import { utilService } from "../services/util.service"
import { loadStations } from "../store/actions/station.actions"
import { stationService } from "../services/station.service"


const BEAT_BG = "#121212"

export function CategoryDetails() {
    const [stations, setStations] = useState(null)
    const [category, setCategory] = useState(null)
    const [displayTitle, setDisplayTitle] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const savedCategory = categoryService.getCategory(params.categoryId)
        setCategory(savedCategory)
        const filterBy = stationService.getDefaultFilter()
        filterBy.categoryId = savedCategory.id
        loadCategoryStations(filterBy)
    }, [])

    async function loadCategoryStations(filterBy) {
        try {
            const categoryStations = await stationService.query(filterBy)
            setStations(categoryStations)

        } catch (error) {
            console.log('loadCategoryStations failed:', error)
        }
    }


    function handleScroll(event) {
        const { scrollTop, scrollHeight, clientHeight } = event.target
        scrollTop > 200 ? setDisplayTitle(true) : setDisplayTitle(false)
    }


    if (!category) return <>Loading</>

    const darkenColor = utilService.darkenColor(category.headerColor)
    const darkestColor = utilService.darkenColor(darkenColor)
 
    const gradientStyle = {
        background: `linear-gradient(${darkenColor} 0px, ${BEAT_BG} 250px,  ${BEAT_BG})`
    }


    return (
        <div className='category-details main' onScroll={handleScroll}>
            <BeatHeader isSearch={false} bgColor={category.headerColor} title={category.name} displayTitle={displayTitle} />
            <div className="category-header" onScroll={handleScroll} style={{ background: `linear-gradient(${category.headerColor} 0px, ${darkenColor} 150px,  ${darkenColor})` }}>
                <div className="category-name fs6rem">{category.name}</div>
            </div>
            <ul className="stations-area" style={{ background: `linear-gradient(${darkestColor} 0px, ${BEAT_BG} 180px,  ${BEAT_BG})` }}>
                <div className="stations">
                    {stations && stations.map(station =>
                        <li key={station._id}>

                            <StationPreview station={station} displayOn={"category"} />

                        </li>
                    )}
                </div>
            </ul>

        </div>
    )
}
