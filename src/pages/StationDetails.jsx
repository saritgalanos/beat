import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { RiMusic2Line } from "react-icons/ri"
import { useParams } from "react-router"
import { stationService } from "../services/station.service"
import { RxDotFilled } from "react-icons/rx"
import { IoMdHeartEmpty } from "react-icons/io"
import { IoEllipsisHorizontalSharp, IoPlaySharp, IoClose } from "react-icons/io5"
import { saveStation } from "../store/actions/station.actions"
import { BiSearchAlt2 } from "react-icons/bi"
import { SongList } from "../cmps/SongList"
import { youtubeService } from "../services/youtube.service"


export function StationDetails() {

  const [station, setStation] = useState(null)
  const [songsFromSearch, setSongsFromSearch] = useState(null)
  const [query, setQuery] = useState('');
  const [openSearch, setOpenSearch] = useState(false);


  const params = useParams()

  useEffect(() => {
    if (params.stationId) {
      loadStation()
      if (station) {
        setOpenSearch(station.songs.length == 0)
      }
      setQuery('');
      setSongsFromSearch([]);
    }
  }, [params.stationId])

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId)
      setStation(station)

    } catch (error) {
      console.log('error:', error)
    }
  }

  function onAddSong(newSong) {
    const updatedStation = stationService.addSongToStation(station, newSong)
    setStation(updatedStation)
    try {
      saveStation(updatedStation)
    } catch (err) {
      Console.log('StationDetails:onAddSong ' + err)
    }
  }

  function resetSearch() {
    setQuery('');
    setSongsFromSearch([]);
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

  async function search() {
    const returnedSongs = await youtubeService.search(query)
    setSongsFromSearch(returnedSongs)
  }

  if (!station) return <div>Loading data</div>

  return (
    <div className='station-details main'>
      <BeatHeader isSearch={false} />

      <div className="station-header">
        <div className='station-pic'>
          {station.createdBy.imgUrl
            ? <img src={station.createdBy.imgUrl} className='station-img' />
            : <RiMusic2Line className='station-no-img' />
          }
        </div>

        <div className="header-details">
          <div className="font-normal">Playlist</div>
          <div className='station-name'>{station.name} </div>
          <div className='details font-normal'>{station.createdBy.fullname}<RxDotFilled />
            {station.likes}<RxDotFilled /> {station.songs.length} songs,
          </div>
        </div>
      </div>

      <div className="station-control">
        <IoPlaySharp className="play" />
        <IoMdHeartEmpty className="like" />
        <IoEllipsisHorizontalSharp className="more" />
      </div>


      <div className="songs">
        <SongList songs={station.songs} includeTitles={true} isPlaylist={true} onAddSong={onAddSong} />
      </div>

      <div className='songs-search'>
        {!openSearch ? (<div className="find-more" onClick={onFindMore}>Find more</div>) :
          <header>
            <div className="search-header">
              <div> Let's find something for your playlist </div>
              <div className="search-area">
                <div className="container"><BiSearchAlt2 className="search-img"
                  onClick={search}
                /> </div>
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

        {
          songsFromSearch !== null && (
            songsFromSearch.length === 0
              ? <div className="empty-space"></div>
              : <div className="songs">
                <SongList songs={songsFromSearch} includeTitles={false} isPlaylist={false} onAddSong={onAddSong} />
              </div>
          )
        }

      </div>
    </div>
  )
}

