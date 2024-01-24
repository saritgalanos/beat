import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { youtubeService } from "../services/youtube.service"
import { SongList } from "../cmps/SongList"


export function SearchPage() {
    const [songsFromSearch, setSongsFromSearch] = useState(null)
    useEffect(() => {

    }, [])

    async function search(query) {
        console.log(query)
        const songs = await youtubeService.search(query)
        setSongsFromSearch(songs)
    }

    function onAddSong() {

    }



    return (
        <div className='search-page main'>
            <BeatHeader isSearch={true} search={search} />

            {(songsFromSearch?.length > 0) && <h1> Songs </h1>}
            <div className="songs">
                <SongList songs={songsFromSearch} includeTitles={false} isPlaylist={false} onAddSong={onAddSong} />
            </div>

        </div>

    )
}
