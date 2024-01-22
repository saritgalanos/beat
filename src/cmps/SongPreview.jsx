
import YouTube from "react-youtube"
import React, { useState, useRef } from 'react'
import { utilService } from "../services/util.service"
import { IoPlay } from "react-icons/io5"
import { HiPause } from "react-icons/hi2"
import { GiPauseButton } from "react-icons/gi";



export function SongPreview({ song, index, isPlayList, onAddSong }) {

    const [songToPreview, setSongToPreview] = useState(song)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMouseOn, setMouseOn] = useState(false)
    const playerRef = useRef(null)

    const videoId = songToPreview.url;

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
        if (isPlaying) {
            if (playerRef.current) {
                playerRef.current.internalPlayer.pauseVideo()
            }
        }
        setIsPlaying(!isPlaying)
    }

    function onAdd() {
        onAddSong(songToPreview)
    }

    const songDetails = songToPreview.title.split('-');
    const artist = songDetails[0];
    const songName = songDetails[1];

    const renderThumbnail = songToPreview.imgUrl
        ? <div className="thumbnail" style={{ backgroundImage: `url(${songToPreview.imgUrl})` }}></div>
        : <div className="pic" style={{ backgroundColor: songToPreview.randomColor }}></div>;

    const currentlyPlaying = (isPlaying) ? 'currently-playing' : ''
    return (
        <div className='song-preview'
            onMouseEnter={() => { setMouseOn(true) }}
            onMouseLeave={() => { setMouseOn(false) }}>
            < div className="search-row" >
                {
                    isPlaying ? (
                        <GiPauseButton  className='index' onClick={toggleAudio} />
                    ) : isMouseOn ? (
                        <div><IoPlay className='index' onClick={toggleAudio} /></div>
                    ) : isPlayList ? (
                        <div className='index'>{index + 1}</div>
                    ) : (
                        <div></div>
                    )
                }

                <div className='song-title'>
                    {renderThumbnail}
                    <div className="artist">{artist}</div>
                    <div className={`song-name ${currentlyPlaying}`}>{songName}</div>
                </div>


                {
                    isPlayList
                        ? <div>{utilService.getDateToDisplay(songToPreview.addedAt, true)}</div>
                        : <button className="add" onClick={onAdd}>Add</button>
                }

            </div >
            <div >
                {isPlaying && <YouTube videoId={videoId} opts={opts} ref={playerRef} className="youtube" />}
            </div>

        </div>

    )
}


