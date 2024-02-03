import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { youtubeService } from "../services/youtube.service"
import { SongList } from "../cmps/SongList"
import { BiSearchAlt2 } from "react-icons/bi"
import { FiSearch } from "react-icons/fi";
import { CategoryPreview } from "../cmps/CategoryPreview"
import { spotifyService } from "../services/spotify.service"
import { categoryService } from "../services/category.services"


export function SearchPage() {
    const [query, setQuery] = useState('')
    const [songsFromSearch, setSongsFromSearch] = useState(null)
    const [categories, setCategories] = useState(null)
    useEffect(() => {
        const spotifyCategories = categoryService.getCategories()
        setCategories(spotifyCategories)
    }, [])


    // async function fetchCategories() {
    //     try {
    //         const spotifyCategories = await spotifyService.fetchSpotifyCategories()
    //         setCategories(spotifyCategories)
    //         console.log('spotifyCategories' + spotifyCategories.length)
    //     }
    //     catch (error) {
    //         Console.log("fetchCategories: " + error)
    //     }
    // }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            search(query)
        }
    }

    function onSearch() {
        search(query)
    }

    async function search(query) {
        if(!query) {
            setSongsFromSearch(null)
        }
        else {
            const songs = await youtubeService.search(query)
            setSongsFromSearch(songs)
        }
    }

    function onAddSong() {

    }






    return (
        <div className="main">
            <div className='search-page'>
                <BeatHeader isSearch={true} search={search} />
                <div className="mobile-display">
                    <div className="search-header">
                        <h1> Search </h1>
                        <div className="search-area">
                            <div className="container"><FiSearch className="search-img"
                                onClick={onSearch}
                            /> </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="What do you want to listen to?"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                </div>




                {(songsFromSearch?.length > 0) &&
                    <div className="songs-from-search">
                        <h1 className="normal-display"> Songs </h1>
                        <div>
                            <SongList songs={songsFromSearch} station={null} includeTitles={false} isPlaylist={false} onAddSong={onAddSong} />
                        </div>
                    </div>}

                {categories && <ul className="categories-area">
                    Browse all
                    <div className="categories">

                        {categories.map(category =>
                            <li key={category.id}>

                                <CategoryPreview category={category} />

                            </li>
                        )}
                    </div>
                </ul>}


            </div>
        </div>

    )
}
