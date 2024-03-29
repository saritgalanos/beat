
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { togglePlay } from "../store/actions/player.actions"
import YouTube from "react-youtube"
import { Slider } from "@mui/material"
import { BiRepeat } from "react-icons/bi"
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6"
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5"
import { PiShuffleBold } from "react-icons/pi"
import { VolumeDown, VolumeOff, VolumeUp } from "@mui/icons-material"
import { utilService } from "../services/util.service"
import { youtubeService } from "../services/youtube.service"


export function Player() {
    const activeSong = useSelector(state => state.playerModule.activeSong)
    const isPlaying = useSelector(state => state.playerModule.isPlaying)

    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(50)


    const dispatch = useDispatch()
    const playerRef = useRef(null)
    const intervalRef = useRef(null)

    useEffect(() => {
      
        updateActiveSongUrl()

        if (playerRef.current && playerRef.current.internalPlayer) {
            if (isPlaying) {
                playerRef.current.internalPlayer.playVideo()
                // Only set the interval if it's not already running
                if (!intervalRef.current) {
                    intervalRef.current = setInterval(() => {
                        updateProgress()
                    }, 1000); // Update progress every second
                }
            } else {
                playerRef.current.internalPlayer.pauseVideo()
                // Clear the interval when pausing
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null; // Reset the ref to null after clearing
                }
            }
        }

        // Cleanup function to clear the interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        };
    }, [activeSong, isPlaying]); // Effect depends on isPlaying

    async function updateActiveSongUrl() {
        if (!activeSong) return

        if ((activeSong.url).startsWith("http")) {
            try {
                activeSong.url = await youtubeService.getSongUrlByTitle(activeSong.title)
            } catch (err) {
                console.log('failed to get song URL')
            }
        }
    }

    async function updateProgress() {
        const player = playerRef.current
        // Ensure the player is fully loaded and the methods exist
        if (player && player.internalPlayer) {
            // Call the methods directly and synchronously
            const currentTime = await player.internalPlayer.getCurrentTime()
            const duration = await player.internalPlayer.getDuration()
            if (duration > 0) { // Ensure duration is a positive number
                const progressValue = (currentTime / duration) * 100
                setProgress(progressValue)
                setCurrentTime(currentTime) // Update state with the new current time
                setDuration(duration);       // Update state with the new duration
            }
        }
    }


    function toggleAudio() {
        dispatch(togglePlay())
    }

    function handleSliderChange(event, newValue) {
        const newTime = (newValue / 100) * duration // Convert percentage to time
        playerRef.current.internalPlayer.seekTo(newTime)
        setProgress(newValue)// Update progress to reflect the slider's new value
    }

    const handleVolumeChange = (event, newValue = 1) => {
        setVolume(newValue);
        if (playerRef?.current?.internalPlayer) {
            playerRef.current.internalPlayer.setVolume(newValue);
        }
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

    const sliderSx = {
        color: 'white',
        '& .MuiSlider-thumb': {
            width: 12,
            height: 12,
            visibility: 'hidden',
        },
        '&:hover': {
            '& .MuiSlider-track': {
                color: '#1ed760',
            },
            '& .MuiSlider-thumb': {
                color: 'white',
                visibility: 'visible',
                boxShadow: 'none',
            }
        },
    }

    return (

        <div className='player'>
            <div className='song-control'>
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
                    <div className='time-display'>{utilService.formatTime(currentTime)}</div>
                    <Slider
                        className='progress-bar'
                        value={progress}
                        onChange={handleSliderChange}
                        aria-labelledby="continuous-slider"
                        sx={sliderSx}
                    />
                    <div className='time-display'>{utilService.formatTime(duration)}</div>
                </div>
            </div>

            <div className='volume_control'>

                {volume === 1 && <VolumeOff onClick={handleVolumeChange} className='volume-icon' />}
                {volume > 1 && volume < 50 && <VolumeDown onClick={handleVolumeChange} className='volume-icon' />}
                {volume >= 50 && <VolumeUp onClick={handleVolumeChange} className='volume-icon' />}

                <Slider
                    className='progress_bar'
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-labelledby="volume-slider"
                    sx={sliderSx}
                    min={1}
                    max={100}
                    valueLabelDisplay="off"
                />
            </div>

            {activeSong && (
                <div className="youtube">
                    <YouTube videoId={activeSong.url} opts={opts} ref={playerRef} />
                </div>
            )}
        </div>
    )

}

