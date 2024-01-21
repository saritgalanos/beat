import { useEffect, useState } from "react"
import axios from 'axios'
import { stationService } from "../services/station.service";
import { SongPreview } from "./SongPreview";
import { IoTimeOutline } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";


export function SongsSearch() {

    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);

    useEffect(() => {

    }, [])


    async function search() {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    maxResults: 30,
                    type: 'video',
                    key: 'AIzaSyB3zk7PRQP35r2OxzIPwABfUO6uS9kP0RU',
                    q: query,
                    order: 'viewCount'
                },
            });
            setSongs(stationService.createSongsListFromSearchResults(response.data))

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }


    function onFindMore() {
        setOpenSearch(true)
    }

    return (

        <div className='songs-search'>
            {!openSearch && <div className="find-more" onClick={onFindMore}>Find more</div>}
            {openSearch &&
                <div className="search-header">
                    <div> Let's find something for your playlist </div>
                    <div className="search-area">
                        <div className="container"><BiSearchAlt2 className="search-img" onClick={search} /> </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for songs"
                        />
                    </div>
                </div>}
            {(songs.length !== 0) && <div className="songs">
                <ul className="font-normal">
                    {(songs).map((song, index) => (
                        <li key={song.url}>
                            <SongPreview song={song} index={index} />
                        </li>
                    ))}

                </ul>
            </div>}
        </div>

    )
}

