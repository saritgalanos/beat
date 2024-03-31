import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"


import { RiDeleteBin5Line, RiMusic2Line } from "react-icons/ri"
import { RxDotFilled } from "react-icons/rx"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { IoEllipsisHorizontalSharp, IoPlaySharp, IoClose, IoPauseSharp } from "react-icons/io5"
import { BiSearchAlt2 } from "react-icons/bi"

import { BeatHeader } from "../cmps/BeatHeader"
import { stationService } from "../services/station.service"


import { deleteStation, loadLikedStations, saveLikedSongsStation, saveStation } from "../store/actions/station.actions"
import { youtubeService } from "../services/youtube.service"
import { utilService } from "../services/util.service"
import { useDispatch, useSelector } from "react-redux"
import { setActiveSong, togglePlay } from "../store/actions/player.actions"
import { spotifyService } from "../services/spotify.service"
import { onToggleModal } from "../store/actions/app.actions"
import { SongList } from "../cmps/SongList"
import { StationEditModal } from "../cmps/StationEditModal"
import { ThreeDots } from "react-loader-spinner"
import { UserContext } from "../contexts/UserContext"


const BEAT_BG = "#121212"


export function StationDetails() {

  const [station, setStation] = useState(null)
  const [songsFromSearch, setSongsFromSearch] = useState(null)
  const [query, setQuery] = useState('')
  const [bgColor, setBgColor] = useState(BEAT_BG)
  const [displayTitle, setDisplayTitle] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const activeStationId = useSelector(state => state.playerModule.activeStationId)
  const isPlaying = useSelector(state => state.playerModule.isPlaying)
  const activeSong = useSelector(state => state.playerModule.activeSong)
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const { loggedinUser, setLoggedinUser } = useContext(UserContext)

  useEffect(() => {
    if (params.stationId) {
      loadStation()
      setQuery('')
      setSongsFromSearch([]);
      setBgColor(BEAT_BG)
    }
  }, [params.stationId])

  useEffect(() => {
    if (station && station.imgUrl) {
      fetchColor()
    }

  }, [station])

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId)
      const isLikedStation = stationService.isLikedStation(station)
      setStation(station)
      setIsLiked(isLikedStation)
    } catch (error) {
      console.log('error:', error)
    }
  }

  async function onPlay() {
    //play the active if belongs to this station or the first song from this station
    const songToPlay = (station._id === activeStationId) ? activeSong : ((station.songs.length > 0) ? station.songs[0] : null)
    if (songToPlay != null) {
      try {
        songToPlay.url = await youtubeService.getSongUrlByTitle(songToPlay.title)
      } catch (err) {
        console.log('failed to get song URL')
      }
      console.log('before dispatch:', songToPlay.uri)
      dispatch(setActiveSong(songToPlay, station._id));
    }
  }

  function onPause() {
    dispatch(togglePlay())
  }

  function handleScroll(event) {
    const { scrollTop, scrollHeight, clientHeight } = event.target
    scrollTop > 200 ? setDisplayTitle(true) : setDisplayTitle(false)
  }


  async function fetchColor() {

    try {
      if (station.name === 'Liked Songs') {
        setBgColor('rgb(70,52,122)')
      }
      else {
        const rgbColor = await utilService.getDominantColorFromImage(station.imgUrl)
        setBgColor(rgbColor)
      }
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

  async function onReorderSongs(newSongsOrder) {
    //a user can reorder only his stations
    if (!loggedinUser || station.createdBy._id !== loggedinUser._id) {
      console.log('trying to reorder a station that is not yours')
      return
    }
    station.songs = newSongsOrder
    try {
      const updatedStation = await saveStation(station)
      setStation(updatedStation)
    } catch (err) {
      Console.log('StationDetails:onReorderSongs ' + err)
    }
  }

  function onDeleteSong(songToDelete) {
    const updatedStation = stationService.deleteSongFromStation(station, songToDelete)
    setStation(updatedStation)
    try {

      (station.name === 'Liked Songs') ? saveLikedSongsStation(updatedStation) : saveStation(updatedStation)

    } catch (err) {
      Console.log('StationDetails:onDeleteSong ' + err)
    }


  }

  function resetSearch() {
    setQuery('');
    setSongsFromSearch([]);
    //setOpenSearch(false);
  }

  function onFindMore() {
    //setOpenSearch(true)
  }

  function onMoreActions() {
    //temp - now only delete
    try {
      deleteStation(station)
    } catch (err) {
      console.log('StationDetails:onDeleteSong ' + err)
    }
    navigate(-1)
  }

  function handleKeyDown(ev) {
    if (ev.key === 'Enter') {
      search()
    }
  }

  async function onUpdateStation(stationToUpdate) {
    try {
      const updatedToUpdate = await saveStation(stationToUpdate)
      setStation(updatedToUpdate)
    } catch (err) {
      console.log("onSaveStation:" + err)
    }
  }

  function editStation() {
    onToggleModal(
      {
        cmp: StationEditModal,
        props: {
          station: station,
          onUpdateStation: onUpdateStation,

        }
      })
  }

  async function search() {
    try {
      const returnedSongs = await youtubeService.search(query)
      debugger
      setSongsFromSearch(returnedSongs)
    } catch (err) {
      console.log('youtube search failed,', err)
    }
  }

  async function toggleLike() {
    const newLikeStatus = !isLiked
    newLikeStatus ? await stationService.likeStation(station) : await stationService.unlikeStation(station)

    loadLikedStations(loggedinUser)
    setIsLiked(newLikeStatus)
  }

  const darkenColor = (bgColor != BEAT_BG) ? utilService.darkenColor(bgColor) : BEAT_BG
  const gradientStyle = {
    background: `linear-gradient(${darkenColor} 0px, ${BEAT_BG} 250px,  ${BEAT_BG})`
  }


  if (!station) return (
    <div className="page-center">
      <ThreeDots visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" />
    </div>)




  const isActiveStation = (station._id === activeStationId)
  const stationPlaying = (isPlaying && isActiveStation)
  const fsName = (station.name.length < 15) ? "fs6rem" : "fs4rem"
  const bySpotify = (station.createdBy._id === "spotify") ? true : false
  const editClass = (bySpotify || station.name === 'Liked Songs') ? '' : "can-edit"
  const supportClick = (bySpotify || station.name === 'Liked Songs') ? null : editStation
  const isSongListFull = station?.songs?.length > 0
  const isUserStation = (station.createdBy._id == loggedinUser?._id) ? true : false
  //const isOpenSearch = isUserStation && !isSongListFull
  const isOpenSearch = true
  const stationPicture = (station.imgUrl) ? station.imgUrl : (station.songs?.length > 0) ? station.songs[0].imgUrl : station.imgUrl
  const isLikedSongsEmpty = station.songs?.length === 0 && station.name === 'Liked Songs'
  return (
    <div className='main' onScroll={handleScroll}>
      <div className='station-details'>
        <BeatHeader isSearch={false} bgColor={bgColor} title={station.name} displayTitle={displayTitle} />

        <div className="station-header" style={{ backgroundColor: bgColor }}>
          <div className={`station-pic ${editClass}`} onClick={supportClick}>
            {stationPicture
              ? <img src={stationPicture} className='station-img' />
              : <RiMusic2Line className='station-no-img' />
            }
          </div>

          <div className="header-details">
            <div>Playlist</div>
            <div className={`name ${fsName} ${editClass}`} onClick={supportClick}>{station.name} </div>
            <div className={`description fs14 ${editClass}`} onClick={supportClick}>{station.description} </div>
            <div className='details fs15'>
              {station.createdBy.fullname}
              {station.likes > 0 && <><RxDotFilled /> <span>{station.likes} likes</span> </>}
              {station.songs?.length > 0 && <><RxDotFilled /> <span>{station.songs.length} songs</span> </>}
            </div>
          </div>
        </div>

        <div className="gradient-bg" style={gradientStyle}>
          <div className="station-control" >

            {!isLikedSongsEmpty && (
              stationPlaying ?
                <IoPauseSharp className="control-icon pause" onClick={onPause} /> :
                <IoPlaySharp className="control-icon play" onClick={onPlay} />
            )}
            {(!isUserStation && loggedinUser && station.name !== 'Liked Songs') && (
              isLiked ? <IoMdHeart className="like unlike" onClick={toggleLike} /> :
                <IoMdHeartEmpty className="like" onClick={toggleLike} />)}

            {(isUserStation && loggedinUser && station.name !== 'Liked Songs') && (
              <RiDeleteBin5Line className="more" onClick={onMoreActions} />)}
            {/* <IoEllipsisHorizontalSharp className="more" /> */}
          </div>


          <div className="songs">
            <SongList songs={station.songs} station={station} includeTitles={true} isPlaylist={true}
              onAddSong={onAddSong} onDeleteSong={onDeleteSong} onReorderSongs={onReorderSongs} />
          </div>

          {isLikedSongsEmpty &&
            <div className='empty-liked'>
              <div className='fw700 fs32'> Songs you like will appear here </div>
              <div> Save songs by tapping the heart icon. </div>
              <button onClick={() => navigate('/search')}> Find Songs </button>
            </div>
          }
        </div>

        <div className="not-for-mobile">
          {!bySpotify && station.name !== 'Liked Songs' &&
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
            </div>}
        </div>
      </div>
    </div>
  )
}



