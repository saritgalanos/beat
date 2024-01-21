
import YouTube from "react-youtube"
import React, { useState, useRef } from 'react'
import { utilService } from "../services/util.service"


export function SongPreview({ song, index, isPlayList }) {
    // const[song, setSong] = useState(song)
    const [isPlaying, setIsPlaying] = useState(false)
    const playerRef = useRef(null)

    const videoId = song.url;

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

    }

    const songDetails = song.title.split('-');
    const artist = songDetails[0];
    const songName = songDetails[1];


    return (
        <div className='song-preview'>
            < div className="search-row" key={song._id} onClick={toggleAudio}>
                <div className='index'>{index + 1}</div>
                <div className='song-title'>
                    {song.imgUrl && <div className="thumbnail"
                        style={{ backgroundImage: `url(${song.imgUrl})` }}> </div>}
                    {!song.imgUrl && <div className="pic" style={{ backgroundColor: song.randomColor }}></div>}
                    <div className="artist">{artist}</div>
                    <div className="song-name">{songName}</div>
                </div>
                {isPlayList && <div>{utilService.getDateToDisplay(song.addedAt, true)}</div>}
                {!isPlayList && <button className="add" onClick={onAdd}>Add</button>}
            </div >
            <div>
                {isPlaying && <YouTube videoId={videoId} opts={opts} ref={playerRef} />}
            </div>

        </div>

    )
}


