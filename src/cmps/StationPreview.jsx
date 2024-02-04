import { useEffect, useState } from "react"
import { RiMusic2Line } from "react-icons/ri"
import { LuDot } from "react-icons/lu";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, togglePlay } from "../store/actions/player.actions";


export function StationPreview({ station, fromCategory=false }) {
  const navigate = useNavigate()

  const activeStationId = useSelector(state => state.playerModule.activeStationId)
  const isPlaying = useSelector(state => state.playerModule.isPlaying)
  const activeSong = useSelector(state => state.playerModule.activeSong)
  const dispatch = useDispatch()

  const isActiveStation = (station._id === activeStationId)
  useEffect(() => {

  }, [])


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




 const categoryStations = (fromCategory)? "category-stations": ""
 const categoryStyling = (fromCategory)? "category-styling": ""
  const activeStationClass = (isActiveStation) ? "active-station" : ""
  const stationPlaying = (isPlaying && isActiveStation)
  return (
    <div className={`station-preview ${categoryStations}`} onClick={() => navigate(`/${station._id}`)}>

      {!stationPlaying && <IoPlaySharp className="play" onClick={onPlay} />}
      {stationPlaying && <IoPauseSharp className="pause" onClick={onPause} />}
      <div className={`station-info ${categoryStyling}`}>
        {!station.createdBy.imgUrl &&
          <div className='station-card'><RiMusic2Line className='no-img' /></div>}
        {station.createdBy.imgUrl &&
          < div className='station-card'>
            <img src={station.createdBy.imgUrl} className='station-img' />

          </div>}

        <div className={`station-txt ${categoryStyling}`}>
          <div className={`station-name ${activeStationClass}`}>{station.name} </div>
          {(fromCategory) ? 
          <div className='station-description' dangerouslySetInnerHTML={{ __html: station.description }}></div>:
          <div className='station-creator'>{station.createdBy.fullname}</div>}
        </div>
      </div>
    </div >
  )
}
