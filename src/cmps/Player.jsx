import { LinearProgress } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { BiRepeat } from "react-icons/bi"
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6"
import { IoPauseCircle, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5"
import { PiShuffleBold } from "react-icons/pi"
import { useDispatch, useSelector } from "react-redux"
import { togglePlay } from "../store/actions/player.actions"
import YouTube from "react-youtube"
import { GiPauseButton } from "react-icons/gi"
import { IoIosPause } from "react-icons/io"



export function Player() {
    const activeSong = useSelector(state => state.playerModule.activeSong)
    const isPlaying = useSelector(state => state.playerModule.isPlaying)
    const dispatch = useDispatch()
    const playerRef = useRef(null)

    useEffect(() => {
        if (playerRef.current && isPlaying) {
            playerRef.current.internalPlayer.playVideo();
        } else if (playerRef.current) {
            playerRef.current.internalPlayer.pauseVideo();
        }
    }, [isPlaying, activeSong]);

    const toggleAudio = () => {
        dispatch(togglePlay()); // Dispatch an action to toggle play/pause
    }

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            modestbranding: 1,
        },
    }

    return (

        <div className='player'>
            <div className='controls'>
                <PiShuffleBold className="player-icon" />
                <IoPlaySkipBack className="player-icon" />
                <div onClick={toggleAudio}>
                    {isPlaying ? <FaCirclePause className="play-icon" /> : <FaCirclePlay className="play-icon" />}
                </div>
                <IoPlaySkipForward className="player-icon" />
                <BiRepeat className="player-icon" />
            </div>
            <div className='details'>
                0.10 <LinearProgress variant="determinate" value={10} className="progress-bar"
                /> 3.05
            </div>
            {activeSong && (
                <div className="youtube">
                    <YouTube videoId={activeSong.url} opts={opts} ref={playerRef} />
                </div>
            )}
        </div>
    )

}
