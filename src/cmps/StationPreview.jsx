import { useEffect, useState } from "react"
import { RiMusic2Line } from "react-icons/ri"
import { useNavigate } from "react-router"
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { setActiveSong, togglePlay } from "../store/actions/player.actions"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export function StationPreview({ station, displayOn = "library", libOpen = false }) {
  //station can be displayed as part of "library", "category" and "homepage"*/

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
    dispatch(togglePlay())
  }




  const activeStationClass = (isActiveStation) ? "active-station" : ""
  const stationPlaying = (isPlaying && isActiveStation)
  const openLib = (libOpen) ? 'open-lib' : ''
  const stationPicture = (station.imgUrl) ? station.imgUrl : (station.songs?.length > 0) ? station.songs[0].imgUrl : station.imgUrl




//   return (
//     <Droppable droppableId={`station-${station._id}`}>
//       {(provided, snapshot) => (
//         // This div becomes the droppable area
//         <div
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//           className={`station-preview ${displayOn} ${openLib} ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
//           onClick={() => navigate(`/${station._id}`)}
//         >
//           {!stationPlaying && <IoPlaySharp className="play" onClick={onPlay} />}
//           {stationPlaying && <IoPauseSharp className="pause" onClick={onPause} />}

//           <div className="station-info">
//             {!stationPicture && <div className='station-card'><RiMusic2Line className='no-img' /></div>}
//             {stationPicture &&
//               <div className='station-card'>
//                 <img src={stationPicture} className='station-img' />
//               </div>}

//             <div className="station-txt">
//               <div className={`station-name ${activeStationClass}`}>{station.name}</div>
//               {(displayOn === "category") ?
//                 <div className='station-description' dangerouslySetInnerHTML={{ __html: station.description }}></div> :
//                 <div className='station-creator'>{station.createdBy.fullname}</div>}
//             </div>
//           </div>
//           {provided.placeholder} {/* This is required for react-beautiful-dnd to work properly */}
//         </div>
//       )}
//     </Droppable>
//   )

// }
   return (
    <div className={`station-preview ${displayOn} ${openLib}`} onClick={() => navigate(`/${station._id}`)}>

      {!stationPlaying && <IoPlaySharp className="play" onClick={onPlay} />}
      {stationPlaying && <IoPauseSharp className="pause" onClick={onPause} />}

      <div className="station-info">
        {!stationPicture &&
          <div className='station-card'><RiMusic2Line className='no-img' /></div>}
        {stationPicture &&
          < div className='station-card'>
            <img src={stationPicture} className='station-img' />

          </div>}

        <div className="station-txt">
          <div className={`station-name ${activeStationClass}`}>{station.name} </div>
          {(displayOn === "category") ?
            <div className='station-description' dangerouslySetInnerHTML={{ __html: station.description }}></div> :
            <div className='station-creator'>{station.createdBy.fullname}</div>}
        </div>
      </div>

    </div >
  )
}
