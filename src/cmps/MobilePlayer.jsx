import { useContext, useEffect, useRef, useState } from "react"
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5"
import { useSelector } from "react-redux"
import { UserContext } from "../contexts/UserContext"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { stationService } from "../services/station.service"
import { Slider } from "@mui/material"
import YouTube from "react-youtube"
import { useDispatch } from "react-redux"
import { togglePlay } from "../store/actions/player.actions"


export function MobilePlayer() {

    const activeSong = useSelector(state => state.playerModule.activeSong)
    const isPlaying = useSelector(state => state.playerModule.isPlaying)
    const activeStationId = useSelector(state => state.playerModule.activeStationId)
    const likedSongsStation = useSelector(state => state.stationModule.likedSongsStation);
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    const [progress, setProgress] = useState(0)
    const [activeStation, setActiveStation] = useState(0)
    const playerRef = useRef(null)
    const intervalRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!activeStationId) return
        loadActiveStation()
    }, [activeStationId])

    async function loadActiveStation() {
        try {
            const station = await stationService.getById(activeStationId)
            setActiveStation(station)
        } catch (error) {
            console.log('error loadStation:', error)
        }
    }


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

    function onPlay() { }
    function onPause() { }
    function toggleLike() { }


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
        padding: 0, // Adjust padding as needed
        margin: 0, // Adjust margin as needed

        '& .MuiSlider-root': {
            padding: '0px', // Override padding here
            margin: '0px' // Override margin here if necessary
        },

        '& .MuiSlider-thumb': {
            width: 0,
            height: 0,
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
        '& .MuiSlider-track': {
            height: 1, // Make the track thinner
        },
        '& .MuiSlider-rail': {
            height: 1, // Make the rail thinner to match the track
        },
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



    function handleSliderChange(event, newValue) {
        const newTime = (newValue / 100) * duration // Convert percentage to time
        playerRef.current.internalPlayer.seekTo(newTime)
        setProgress(newValue)// Update progress to reflect the slider's new value
    }

    var songDetails = ''
    var artist = ''
    var songName = ''
    var renderThumbnail = ''

    if (activeSong) {
        songDetails = activeSong.title.split('-')
        songName = songDetails[0]
        artist = songDetails[1]
        renderThumbnail = activeSong?.imgUrl
            ? <div className="thumbnail" style={{ backgroundImage: `url(${activeSong.imgUrl})` }}></div>
            : <div className="pic" style={{ backgroundColor: activeSong.randomColor }}></div>;
    }

    
    function toggleAudio() {
        dispatch(togglePlay())
    }


    const isLiked = likedSongsStation?.songs?.find(likedSong => activeSong?.id === likedSong?.id);
    return (
        <div className="mobile-player">
              {activeSong && (
                <div className="youtube">
                    <YouTube videoId={activeSong.url} opts={opts} ref={playerRef} />
                </div>
            )}
            {(activeSong !== null) &&
                < div className="player-bar">
                    <section className="currently-playing-preview">
                        <div className='song-title'>
                            {renderThumbnail}
                            <div className="song-name fs13">{songName}</div>
                            <div className="artist fs13">{artist}</div>
                        </div>

                        {isLiked ?
                            <IoMdHeart className="heart liked" onClick={toggleLike} /> :
                            <IoMdHeartEmpty className="heart " onClick={toggleLike} />

                        }

                        {isPlaying ?
                            <IoPauseSharp className="control" onClick={toggleAudio} /> :
                            <IoPlaySharp className="control" onClick={toggleAudio} />
                        }

                    </section>
                    <Slider
                        className='progress-bar'
                        value={progress}
                        onChange={handleSliderChange}
                        aria-labelledby="continuous-slider"
                        sx={sliderSx}
                    />



                </div>}
          
        </div >
    )

}