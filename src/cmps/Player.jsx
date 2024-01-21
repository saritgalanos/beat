import { VideoFileRounded } from "@mui/icons-material"
import { Box, LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { BiRepeat } from "react-icons/bi"
import { FaCirclePlay } from "react-icons/fa6"
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5"
import { PiShuffleBold } from "react-icons/pi"



export function Player({videoId}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [videoId, setVideoId] = useState(videoId);
    const playerRef = useRef(null)
    
    useEffect(() => {

    }, [])

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 1,
            controls: 1,
            loop: 1,
            modestbranding: 1,
        },
    }

    const toggleAudio = () => {
        if(isPlaying) {
            if (playerRef.current) {
                playerRef.current.internalPlayer.pauseVideo()
              }    
        }
        setIsPlaying(!isPlaying)
    }


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

            <div>
                {isPlaying && <YouTube videoId={videoId} opts={opts} ref={playerRef}/>}
            </div>

        </div>
    )
}
