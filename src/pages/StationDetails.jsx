import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { RiMusic2Line } from "react-icons/ri"
import { useParams } from "react-router"
import { stationService } from "../services/station.service"
import { RxDotFilled } from "react-icons/rx"



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

      </header>

      <div>
        <div className='station-name'>{station.name} </div>
        <div className='station-creator'>Playlist<RxDotFilled />{station.createdBy.fullname}</div>
        <br></br>
        {(station.songs).map(song => (
          <div key={song._id}>{song.title}</div>
        ))}


      </div>
    </div >
  )
}
