import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { RiMusic2Line } from "react-icons/ri"
import { useParams } from "react-router"
import { stationService } from "../services/station.service"
import { RxDotFilled } from "react-icons/rx"
import { IoTimeOutline } from "react-icons/io5"

import { IoMdHeartEmpty } from "react-icons/io"
import { IoEllipsisHorizontalSharp, IoPlaySharp } from "react-icons/io5"
import { SongsSearch } from "../cmps/SongsSearch"
import { SongPreview } from "../cmps/SongPreview"
import { saveStation } from "../store/actions/station.actions"



export function StationDetails() {

  const [station, setStation] = useState(null)
  const [songs, setSongs] = useState(null)
  const params = useParams()

  useEffect(() => {
    if (params.stationId) {
      loadStation()
    }
  }, [params.stationId])

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId)
      setStation(station)
      setSongs(station.songs)
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onAddSong(song) {
    song.addedAt = Date.now()

    const updatedSongs = [...station.songs, song]
    setSongs(updatedSongs)
    setStation(station)
    station.songs = updatedSongs
    try {
      saveStation(station)
    } catch (err) {
      Console.log('StationDetails:onAddSong ' + err)
    }
  }

  if (!station) return <div>Loading data</div>
  const showSearch = (station.songs.length == 0) ? true : false

  return (
    <div className='station-details main'>
      <BeatHeader isSearch={false} />

      <header>
       
        <div className='station-details-card'>
          {station.createdBy.imgUrl
            ? <img src={station.createdBy.imgUrl} className='station-details-img' />
            : <RiMusic2Line className='station-details-no-img' />
          }
        </div>

        <div className="header-details">
          <div className="font-normal">Playlist</div>
          <div className='station-name'>{station.name} </div>
          <div className='details font-normal'>{station.createdBy.fullname}<RxDotFilled />
            {station.likes}<RxDotFilled /> {station.songs.length} songs,
          </div>
        </div>
      </header>

      <div className="station-control">

        <IoPlaySharp className="play" />
        <IoMdHeartEmpty className="like" />
        <IoEllipsisHorizontalSharp className="more" />


      </div>



      <div className="songs">
        {(station.songs.length !== 0) &&
          <div className="table-header table-row font-normal">
            <div>#</div>
            <div>Title</div>
            <div>Date added</div>
            <div><IoTimeOutline /></div>

          </div>}


        <ul className="font-normal">
          {(station.songs).map((song, index) => (
            <li key={song.id || index}>
              <SongPreview song={song} index={index} isPlayList={true} />
            </li>
          ))}

        </ul>
      </div>
      <div><SongsSearch showSearch={showSearch} onAddSong={onAddSong} /></div>
    </div>

  )
}

