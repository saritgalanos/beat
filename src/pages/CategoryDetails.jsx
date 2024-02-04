import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { spotifyService } from "../services/spotify.service"
import { useNavigate, useParams } from "react-router"
import { categoryService } from "../services/category.services"
import { StationPreview } from "../cmps/StationPreview"


export function CategoryDetails() {

    const [stations, setStations] = useState(null)
    const[category, setCategory] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {

        const savedCategory = categoryService.getCategory(params.categoryId)
        setCategory(savedCategory)
        loadCategoryStations(savedCategory.id)
      
        // spotifyService.searchPlaylists()
        // spotifyService.fetchSpotifyFeaturedPlaylists()
        //spotifyService.fetchSpotifyCategories()
        //spotifyService.fetchSpotifyCategoriesPlaylistsAndTracks()

    }, [])

    async function loadCategoryStations(categoryId) {
        try {
            const categoryStations = await categoryService.fetchStationsForCategory(categoryId)
            setStations(categoryStations)

        } catch (error) {
            console.log('loadCategoryStations failed:', error)
        }
    }

    if(!category) return <>Loading</>

    return (
        <div className='category-details main'>
            <BeatHeader isSearch={false} className="dynamic-display" />
         
                <h1>{category.name}</h1>
                <ul className="stations-area">
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
