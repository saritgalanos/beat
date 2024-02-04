import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { RiDeleteBin5Line, RiMusic2Line } from "react-icons/ri"
import { useNavigate, useParams } from "react-router"
import { stationService } from "../services/station.service"
import { RxDotFilled } from "react-icons/rx"
import { IoMdHeartEmpty } from "react-icons/io"
import { IoEllipsisHorizontalSharp, IoPlaySharp, IoClose, IoPauseSharp } from "react-icons/io5"
import { deleteStation, saveStation } from "../store/actions/station.actions"
import { BiSearchAlt2 } from "react-icons/bi"
import { SongList } from "../cmps/SongList"
import { youtubeService } from "../services/youtube.service"
import { utilService } from "../services/util.service"
import { css } from "@emotion/react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveSong, togglePlay } from "../store/actions/player.actions"

const BEAT_BG = "#121212"


export function StationDetails() {

  const [station, setStation] = useState(null)
  const [songsFromSearch, setSongsFromSearch] = useState(null)
  const [query, setQuery] = useState('')
  const [isOpenSearch, setOpenSearch] = useState(false)
  const [bgColor, setBgColor] = useState(BEAT_BG)

  const activeStationId = useSelector(state => state.playerModule.activeStationId)
  const isPlaying = useSelector(state => state.playerModule.isPlaying)
  const activeSong = useSelector(state => state.playerModule.activeSong)
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.stationId) {
      loadStation()
      setQuery('');
      setSongsFromSearch([]);
      setOpenSearch(false)
      setBgColor(BEAT_BG)
    }
  }, [params.stationId])

  useEffect(() => {
    if (station && station.createdBy.imgUrl) {
      fetchColor()
    }


    if (station && station.songs.length === 0) {
      setOpenSearch(true);
    }
  }, [station])

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId)
      setStation(station)

    } catch (error) {
      console.log('error:', error)
    }
  }

  function onPlay() {
    //play the active if belongs to this station or the first song from this station
    const songToPlay = (station._id === activeStationId) ? activeSong : ((station.songs.length > 0) ? station.songs[0] : null)
    if (songToPlay != null) {
      dispatch(setActiveSong(songToPlay, station._id));
    }
  }

  function onPause() {
    console.log('clicked')
    dispatch(togglePlay())
  }



  async function fetchColor() {

    try {
      const rgbColor = await utilService.getDominantColorFromImage(station.createdBy.imgUrl)
      setBgColor(rgbColor)
    } catch (error) {
      console.error(error);
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

  function onDeleteSong(songToDelete) {
    const updatedStation = stationService.deleteSongFromStation(station, songToDelete)
    setStation(updatedStation)
    try {
      saveStation(updatedStation)
    } catch (err) {
      Console.log('StationDetails:onDeleteSong ' + err)
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

  function onMoreActions() {
    //temp - now only delete
    try {
      deleteStation(station)
    } catch (err) {
      console.log('StationDetails:onDeleteSong ' + err)
    }
    navigate('/')
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

  const darkenColor = (bgColor != BEAT_BG) ? utilService.darkenColor(bgColor) : BEAT_BG
  const gradientStyle = {
    background: `linear-gradient(${darkenColor} 0px, ${BEAT_BG} 250px,  ${BEAT_BG}`
  }


  if (!station) return <div>Loading data</div>
  const isActiveStation = (station._id === activeStationId)
  const stationPlaying = (isPlaying && isActiveStation)
  return (
    <div className='main'>
      <div className='station-details'>
        <BeatHeader isSearch={false} bgColor={bgColor} />

        <div className="station-header" style={{ backgroundColor: bgColor }}>
          <div className='station-pic'>
            {station.createdBy.imgUrl
              ? <img src={station.createdBy.imgUrl} className='station-img' />
              : <RiMusic2Line className='station-no-img' />
            }
          </div>

          <div className="header-details">
            <div>Playlist</div>
            <div className='name no-wrap'>{station.name} </div>
            <div className='details'>{station.createdBy.fullname}<RxDotFilled />
              {station.likes}<RxDotFilled /> {station.songs.length} songs,
            </div>
          </div>
        </div>

        <div className="gradient-bg" style={gradientStyle}>
          <div className="station-control" >
            {!stationPlaying && <IoPlaySharp className="play" onClick={onPlay} />}
            {stationPlaying && <IoPauseSharp className="pause" onClick={onPause} />}
            <IoMdHeartEmpty className="like" />
            <RiDeleteBin5Line className="more" onClick={onMoreActions} />
            {/* <IoEllipsisHorizontalSharp className="more" /> */}
          </div>


          <div className="songs">
            <SongList songs={station.songs} station={station} includeTitles={true} isPlaylist={true}
              onAddSong={onAddSong} onDeleteSong={onDeleteSong} />
          </div>
        </div>

        <div className="dynamic-display">
          <div className='songs-search'>
            {!isOpenSearch ? (<div className="find-more" onClick={onFindMore}>Find more</div>) :
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
                    <SongList songs={songsFromSearch} station={null} includeTitles={false} isPlaylist={false} onAddSong={onAddSong} />
                  </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

