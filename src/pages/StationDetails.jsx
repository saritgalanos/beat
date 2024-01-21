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



export function StationDetails() {

  const [station, setStation] = useState(null)
  const params = useParams()

  useEffect(() => {
    if (params.stationId) {
      loadStation()
    }
  }, [params.stationId])

  console.log()

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId)
      setStation(station)
    } catch (error) {
      console.log('error:', error)
    }
  }

  if (!station) return <div>Loading data</div>

  return (
    <div className='station-details main'>
      <BeatHeader isSearch={false} />

      <header>
        {!station.createdBy.imgUrl &&
          <div className='station-details-card'><RiMusic2Line className='station-details-no-img' /></div>}
        {station.createdBy.imgUrl &&
          < div className='station-details-card'><img src={station.createdBy.imgUrl} className='station-details-img' /></div>}
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
        <div className="table-header table-row font-normal">
          <div>#</div>
          <div>Title</div>
          <div>Date added</div>
          <div><IoTimeOutline /></div>

        </div>


        <ul className="font-normal">
          {(station.songs).map((song, index) => (
             <li key={song.id || index}>
            <SongPreview song={song} index={index} isPlayList={true} />
            </li>
          ))}

        </ul>
      </div>
     <div><SongsSearch /></div>
    </div>

  )
}

