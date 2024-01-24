
import YouTube from "react-youtube"
import React, { useState, useRef } from 'react'
import { utilService } from "../services/util.service"
import { IoEllipsisHorizontalSharp, IoPlay } from "react-icons/io5"
import { GiPauseButton } from "react-icons/gi"
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSong, togglePlay } from '../store/actions/player.actions'
import { RiDeleteBin5Line } from "react-icons/ri"



export function SongPreview({ song, index, isPlaylist, onAddSong ,onDeleteSong}) {

    const [songToPreview, setSongToPreview] = useState(song)

    const [isMouseOn, setMouseOn] = useState(false)
    const playerRef = useRef(null)
    const dispatch = useDispatch()

    const { activeSong, isPlaying } = useSelector(state => state.playerModule);

    const isActive = activeSong && songToPreview._id === activeSong._id;
    const isThisSongPlaying = isActive && isPlaying;


    function onPlay() {
        dispatch(setActiveSong(songToPreview));
    }

    function onPause() {
        console.log('clicked')
        dispatch(togglePlay())
    }


    function onAdd() {
        onAddSong(songToPreview)
    }

    function onMoreActions() {
        onDeleteSong(songToPreview)
    }

    const songDetails = songToPreview.title.split('-');
    const artist = songDetails[0];
    const songName = songDetails[1];

    const renderThumbnail = songToPreview.imgUrl
        ? <div className="thumbnail" style={{ backgroundImage: `url(${songToPreview.imgUrl})` }}></div>
        : <div className="pic" style={{ backgroundColor: songToPreview.randomColor }}></div>;

    const currentlyPlaying = (isThisSongPlaying) ? 'currently-playing' : ''
    return (
        <div className='song-preview'
            onMouseEnter={() => { setMouseOn(true) }}
            onMouseLeave={() => { setMouseOn(false) }}>
            < div className="search-row" >
                {
                    isThisSongPlaying ? (
                        <GiPauseButton className='index' onClick={onPause} />
                    ) : isMouseOn ? (
                        <div><IoPlay className='index' onClick={onPlay} /></div>
                    ) : isPlaylist ? (
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
                    isPlaylist
                        ? <div>{utilService.getDateToDisplay(songToPreview.addedAt, true)}</div>
                        : <button className="add" onClick={onAdd}>Add</button>
                }

                {
                    (isPlaylist && isMouseOn)
                        ? <div><RiDeleteBin5Line className='more-actions' onClick={onMoreActions} /></div>
                        : <div></div>
                }


            </div >
        </div>

    )
}


