import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { youtubeService } from "../services/youtube.service"
import { SongList } from "../cmps/SongList"
import { BiSearchAlt2 } from "react-icons/bi"
import { FiSearch } from "react-icons/fi";


export function SearchPage() {
    const [query, setQuery] = useState('')
    const [songsFromSearch, setSongsFromSearch] = useState(null)
    useEffect(() => {

    }, [])

    async function search() {
        const songs = await youtubeService.search(query)
        setSongsFromSearch(songs)
    }

    function onAddSong() {

    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            search()
        }
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
                                onClick={search}
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





                <div className="main-content">
                    {(songsFromSearch?.length > 0) && <h1 className="normal-display"> Songs </h1>}
                    <div>
                        <SongList songs={songsFromSearch} includeTitles={false} isPlaylist={false} onAddSong={onAddSong} />
                    </div>
                </div>
            </div>
        </div>

    )
}
