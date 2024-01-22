import { useEffect, useState } from "react"
import axios from 'axios'
import { stationService } from "../services/station.service";
import { SongPreview } from "./SongPreview";
import { IoClose, IoTimeOutline } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";


export function SongsSearch({ showSearch, onAddSong }) {

    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [openSearch, setOpenSearch] = useState(showSearch);

    useEffect(() => {

    }, [])

    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

    async function search() {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    maxResults: 30,
                    type: 'video',
                    key: API_KEY,
                    q: query,
                    order: 'viewCount'
                },
            });
            setSongs(stationService.createSongsListFromSearchResults(response.data))

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
    function resetSearch() {
        setQuery('');
        setSongs([]);
        setOpenSearch(false);
    }


    function onFindMore() {
        setOpenSearch(true)
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            search()
        }
    }

    return (

        <div className='songs-search'>
            {!openSearch && <div className="find-more" onClick={onFindMore}>Find more</div>}
            {openSearch &&
                <header>
                    <div className="search-header">
                        <div> Let's find something for your playlist </div>
                        <div className="search-area">
                            <div className="container"><BiSearchAlt2 className="search-img" onClick={search} /> </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for songs"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                    <IoClose className="close" onClick={resetSearch} />
                </header>}
            {(songs.length == 0) && <div><br></br> <br></br> <br></br> <br></br> <br></br></div>}
            {(songs.length !== 0) && <div className="songs">
                <ul className="font-normal">
                    {(songs).map((song, index) => (
                        <li key={song.url}>
                            <SongPreview song={song} index={index} onAddSong={onAddSong}/>
                        </li>
                    ))}

                </ul>
            </div>}
        </div>

    )
}

