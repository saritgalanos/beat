import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { spotifyService } from "../services/spotify.service"
import { useNavigate, useParams } from "react-router"
import { categoryService } from "../services/category.services"
import { StationPreview } from "../cmps/StationPreview"
import { utilService } from "../services/util.service"

const BEAT_BG = "#121212"

export function CategoryDetails() {

    const [stations, setStations] = useState(null)
    const [category, setCategory] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {

        const savedCategory = categoryService.getCategory(params.categoryId)
        setCategory(savedCategory)
        loadCategoryStations(savedCategory.id)

    }, [])

    async function loadCategoryStations(categoryId) {
        try {
            const categoryStations = await categoryService.fetchStationsForCategory(categoryId)
            setStations(categoryStations)

        } catch (error) {
            console.log('loadCategoryStations failed:', error)
        }
    }

    if (!category) return <>Loading</>

    const darkenColor = utilService.darkenColor(category.headerColor)
    const darkestColor = utilService.darkenColor(darkenColor)
    console.log(darkenColor)
    const gradientStyle = {
        background: `linear-gradient(${darkenColor} 0px, ${BEAT_BG} 250px,  ${BEAT_BG})`
    }
    console.log(category.headerColor)

    return (
        <div className='category-details main'>
            <BeatHeader isSearch={false} bgColor={category.headerColor} className="dynamic-display" />
            <div className="category-header" style={{ background: `linear-gradient(${category.headerColor} 0px, ${darkenColor} 150px,  ${darkenColor})` }}>
                <div className="category-name fs6rem">{category.name}</div>
            </div>
            <ul className="stations-area" style={{ background: `linear-gradient(${darkestColor} 0px, ${BEAT_BG} 180px,  ${BEAT_BG})` }}>
                <div className="stations">
                    {stations && stations.map(station =>
                        <li key={station._id}>

                            <StationPreview station={station} fromCategory={true} />

                        </li>
                    )}
                </div>
            </ul>

        </div>
    )
}
