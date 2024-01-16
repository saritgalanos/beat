import { useEffect, useState } from "react"
import { RiMusic2Line } from "react-icons/ri"
import { LuDot } from "react-icons/lu";
import { RxDotFilled } from "react-icons/rx";


export function StationPreview({ station }) {

  useEffect(() => {

  }, [])
  console.log(station)

  return (
    <div className='station-preview'>
      <div className='station-info'>
        {!station.createdBy.imgUrl &&
          <div className='station-card'><RiMusic2Line className='station-no-img' /></div>}
        {station.createdBy.imgUrl &&
          < div className='station-card'><img src={station.createdBy.imgUrl} className='station-img' /></div>}


        <div className='station-name'>{station.name} </div>
        <div className='station-creator'>Playlist<RxDotFilled />{station.createdBy.fullname}</div>
      </div>
    </div >
  )
}
