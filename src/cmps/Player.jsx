
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { togglePlay } from "../store/actions/player.actions"
import YouTube from "react-youtube"
import { Slider } from "@mui/material"
import { LinearProgress } from "@mui/material"
import { BiRepeat } from "react-icons/bi"
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6"
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5"
import { PiShuffleBold } from "react-icons/pi"

export function Player() {
    const activeSong = useSelector(state => state.playerModule.activeSong)
    const isPlaying = useSelector(state => state.playerModule.isPlaying)

    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const dispatch = useDispatch()
    const playerRef = useRef(null)
    const intervalRef = useRef(null)

    useEffect(() => {
        if (playerRef.current && playerRef.current.internalPlayer) {
            if (isPlaying) {
                playerRef.current.internalPlayer.playVideo();
                // Only set the interval if it's not already running
                if (!intervalRef.current) {
                    intervalRef.current = setInterval(() => {
                        updateProgress();
                    }, 1000); // Update progress every second
                }
            } else {
                playerRef.current.internalPlayer.pauseVideo();
                // Clear the interval when pausing
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null; // Reset the ref to null after clearing
                }
            }
        }

        // Cleanup function to clear the interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [activeSong, isPlaying]); // Effect depends on isPlaying


    async function updateProgress() {
        const player = playerRef.current;
        // Ensure the player is fully loaded and the methods exist
        if (player && player.internalPlayer) {
            // Call the methods directly and synchronously
            const currentTime = await player.internalPlayer.getCurrentTime();
            const duration = await player.internalPlayer.getDuration();
            if (duration > 0) { // Ensure duration is a positive number
                const progressValue = (currentTime / duration) * 100;
                setProgress(progressValue);
                setCurrentTime(currentTime); // Update state with the new current time
                setDuration(duration);       // Update state with the new duration
            }
        }
    }


    function formatTime(timeInSeconds) {
        const pad = (num, size) => ('000' + num).slice(size * -1);
        const time = parseFloat(timeInSeconds).toFixed(3);
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor(time / 60) % 60;
        const seconds = Math.floor(time - minutes * 60);

        return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
    }

    
    function toggleAudio() {
        dispatch(togglePlay())
    }

    function handleSliderChange (event, newValue)  {
        const newTime = (newValue / 100) * duration; // Convert percentage to time
        playerRef.current.internalPlayer.seekTo(newTime);
        setProgress(newValue); // Update progress to reflect the slider's new value
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
                <div className='time-display'>{formatTime(currentTime)}</div>
                <Slider
                    className='progress-bar'
                    value={progress}
                    onChange={handleSliderChange}
                    aria-labelledby="continuous-slider"
                    sx={{
                        color: 'white', // Change this to customize the slider color
                      
                        '& .MuiSlider-thumb': {
                            width: 12, // Smaller thumb width
                            height: 12, // Smaller thumb height
                            visibility: 'hidden', // Hide the thumb by default
                        },
                        '&:hover': {
                            // Target the hover state
                            '& .MuiSlider-track': {
                              color: '#1ed760', // Change the track color on hover
                            },
                            '& .MuiSlider-thumb': {
                              color: 'white', // Ensure the thumb remains white on hover
                              visibility: 'visible',
                              boxShadow: 'none', 
                            }
                          },
                    }}
                />
                <div className='time-display'>{formatTime(duration)}</div>
            </div>
            
            {activeSong && (
                <div className="youtube">
                    <YouTube videoId={activeSong.url} opts={opts} ref={playerRef} />
                </div>
            )}
        </div>
    )

}




// useEffect(() => {
//     const interval = setInterval(() => {
//         updateProgress();
//     }, 1000); // Update progress every second

//     return () => clearInterval(interval);
// }, [])

// useEffect(() => {
//    // debugger
//     if (playerRef.current && isPlaying) {
//         playerRef.current.internalPlayer.playVideo();
//     } else if (playerRef.current) {
//         playerRef.current.internalPlayer.pauseVideo();
//     }
// }, [isPlaying, activeSong]);

// useEffect(() => {
//     setProgress(0);
// }, [activeSong]); // Only depend on activeSong





// import { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { togglePlay } from "../store/actions/player.actions"
// import YouTube from "react-youtube"
// //import { Slider } from "@mui/material"
// import { LinearProgress } from "@mui/material"
// import { BiRepeat } from "react-icons/bi"
// import { FaCirclePause, FaCirclePlay } from "react-icons/fa6"
// import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5"
// import { PiShuffleBold } from "react-icons/pi"

// export function Player() {
//     const activeSong = useSelector(state => state.playerModule.activeSong)
//     const isPlaying = useSelector(state => state.playerModule.isPlaying)

//     const [progress, setProgress] = useState(0);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);

//     const dispatch = useDispatch()
//     const playerRef = useRef(null)
//     const intervalRef = useRef(null)

//     useEffect(() => {
//         if (playerRef.current && playerRef.current.internalPlayer) {
//             if (isPlaying) {
//                 playerRef.current.internalPlayer.playVideo();
//                 // Only set the interval if it's not already running
//                 if (!intervalRef.current) {
//                     intervalRef.current = setInterval(() => {
//                         updateProgress();
//                     }, 1000); // Update progress every second
//                 }
//             } else {
//                 playerRef.current.internalPlayer.pauseVideo();
//                 // Clear the interval when pausing
//                 if (intervalRef.current) {
//                     clearInterval(intervalRef.current);
//                     intervalRef.current = null; // Reset the ref to null after clearing
//                 }
//             }
//         }

//         // Cleanup function to clear the interval on component unmount
//         return () => {
//             if (intervalRef.current) {
//                 clearInterval(intervalRef.current);
//                 intervalRef.current = null;
//             }
//         };
//     }, [activeSong, isPlaying]); // Effect depends on isPlaying


//     async function updateProgress() {
//         const player = playerRef.current;
//         // Ensure the player is fully loaded and the methods exist
//         if (player && player.internalPlayer) {
//             // Call the methods directly and synchronously
//             const currentTime = await player.internalPlayer.getCurrentTime();
//             const duration = await player.internalPlayer.getDuration();
//             if (duration > 0) { // Ensure duration is a positive number
//                 const progressValue = (currentTime / duration) * 100;
//                 setProgress(progressValue);
//                 setCurrentTime(currentTime); // Update state with the new current time
//                 setDuration(duration);       // Update state with the new duration
//             }
//         }
//     }


//     function formatTime(timeInSeconds) {
//         const pad = (num, size) => ('000' + num).slice(size * -1);
//         const time = parseFloat(timeInSeconds).toFixed(3);
//         const hours = Math.floor(time / 3600);
//         const minutes = Math.floor(time / 60) % 60;
//         const seconds = Math.floor(time - minutes * 60);

//         return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
//     }

    
//     function toggleAudio() {
//         dispatch(togglePlay())
//     }

//     const opts = {
//         height: '0',
//         width: '0',
//         playerVars: {
//             autoplay: 1,
//             controls: 0,
//             loop: 1,
//             modestbranding: 1,
//         },
//     }

//     return (

//         <div className='player'>
//             <div className='controls'>
//                 <PiShuffleBold className="player-icon" />
//                 <IoPlaySkipBack className="player-icon" />
//                 <div onClick={toggleAudio}>
//                     {isPlaying ? <FaCirclePause className="play-icon" /> : <FaCirclePlay className="play-icon" />}
//                 </div>
//                 <IoPlaySkipForward className="player-icon" />
//                 <BiRepeat className="player-icon" />
//             </div>
//             <div className='details'>
//                 <div className='time-display'>{formatTime(currentTime)}</div>
//                 <LinearProgress variant="determinate" value={progress}
//                      sx={{
//                         '& .MuiLinearProgress-bar1Determinate': {
//                           backgroundColor: 'white', // Set the initial color to white
//                         },
//                         '&:hover .MuiLinearProgress-bar1Determinate': {
//                           backgroundColor: 'green', // Change to green on hover
//                         }
//                       }}
//                     className="progress-bar" />
//                 <div className='time-display'>{formatTime(duration)}</div>
//             </div>
//             {activeSong && (
//                 <div className="youtube">
//                     <YouTube videoId={activeSong.url} opts={opts} ref={playerRef} />
//                 </div>
//             )}
//         </div>
//     )

// }




// useEffect(() => {
//     const interval = setInterval(() => {
//         updateProgress();
//     }, 1000); // Update progress every second

//     return () => clearInterval(interval);
// }, [])

// useEffect(() => {
//    // debugger
//     if (playerRef.current && isPlaying) {
//         playerRef.current.internalPlayer.playVideo();
//     } else if (playerRef.current) {
//         playerRef.current.internalPlayer.pauseVideo();
//     }
// }, [isPlaying, activeSong]);

// useEffect(() => {
//     setProgress(0);
// }, [activeSong]); // Only depend on activeSong




