import { Box, LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { BiRepeat } from "react-icons/bi"
import { FaCirclePlay } from "react-icons/fa6"
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5"
import { PiShuffleBold } from "react-icons/pi"



export function Player() {

    useEffect(() => {

    }, [])



    return (
        <div className='player'>

            <div className='controls'>

                <PiShuffleBold className="player-icon" />
                <IoPlaySkipBack className="player-icon" />
                <FaCirclePlay className="play-icon" />
                <IoPlaySkipForward className="player-icon" />
                <BiRepeat  className="player-icon" />


            </div>
            <div className='details'>
                0.10 <LinearProgress variant="determinate" value={10} className="progress-bar" /> 3.05
            </div>
        </div>
    )
}
