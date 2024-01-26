import { useEffect, useState } from "react"
import { RiMusic2Line } from "react-icons/ri"
import { LuDot } from "react-icons/lu";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router";


export function StationPreview({ station }) {
  const navigate = useNavigate()

  useEffect(() => {

  }, [])

  return (
    <div className='station-preview' onClick={() => navigate(`/${station._id}`)}>
      <div className='station-info'>
        {!station.createdBy.imgUrl &&
          <div className='station-card'><RiMusic2Line className='no-img' /></div>}
        {station.createdBy.imgUrl &&
          < div className='station-card'><img src={station.createdBy.imgUrl} className='station-img' /></div>}

        <div className="station-txt">
          <div className='station-name'>{station.name} </div>
          <div className='station-creator'>{station.createdBy.fullname}</div>
        </div>
      </div>
    </div >
  )
}
