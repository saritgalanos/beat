
import YouTube from "react-youtube"
import React, { useState, useRef } from 'react'
import { utilService } from "../services/util.service"
import { IoEllipsisHorizontalSharp, IoPlay } from "react-icons/io5"
import { GiPauseButton } from "react-icons/gi"
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSong, togglePlay } from '../store/actions/player.actions'
import { RiDeleteBin5Line } from "react-icons/ri"
import { IoMdMore } from "react-icons/io"



export function SongPreview({ song, index, isPlaylist, onAddSong, onDeleteSong }) {

    const [songToPreview, setSongToPreview] = useState(song)

    const [isMouseOn, setMouseOn] = useState(false)
    const playerRef = useRef(null)
    const dispatch = useDispatch()

    const { activeSong, isPlaying } = useSelector(state => state.playerModule);

    const isActive = activeSong && songToPreview._id === activeSong._id;
    const isThisSongPlaying = isActive && isPlaying;

    //temp function
    function onPic() {

        (isActive && isPlaying) ? onPause() : onPlay()
    }

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
        ? <div className="thumbnail" onClick={onPic} style={{ backgroundImage: `url(${songToPreview.imgUrl})` }}></div>
        : <div className="pic" onClick={onPic} style={{ backgroundColor: songToPreview.randomColor }}></div>;

    const currentlyPlaying = (isThisSongPlaying) ? 'currently-playing' : ''
    return (
        <div className='song-preview'
            onMouseEnter={() => { setMouseOn(true) }}
            onMouseLeave={() => { setMouseOn(false) }}>

            {isPlaylist &&
                <>
                    <div className="dynamic-display">
                        < div className="playlist-row" >

                            {
                                isThisSongPlaying ? (
                                    <GiPauseButton className='index' onClick={onPause} />
                                ) : isMouseOn ? (
                                    <div><IoPlay className='index' onClick={onPlay} /></div>
                                ) : <div className='index'>{index + 1}</div>
                            }
                            <div className='song-title'>
                                {renderThumbnail}
                                <div className="artist">{artist}</div>
                                <div className={`song-name ${currentlyPlaying}`}>{songName}</div>
                            </div>

                            <div>{utilService.getDateToDisplay(songToPreview.addedAt, true)}</div>
                            {
                                (isMouseOn) && <div><RiDeleteBin5Line className='more-actions' onClick={onMoreActions} /></div>
                            }

                        </div>
                    </div>
                    <div className="mobile-display">
                        < div className="playlist-row" >

                            <div className='song-title'>
                                {renderThumbnail}
                                <div className="artist">{artist}</div>
                                <div className={`song-name ${currentlyPlaying}`}>{songName}</div>
                            </div>
                            <IoMdMore className="img-more" />
                        </div>
                    </div>


                </>}



            {!isPlaylist &&
                <div className="song-from-search">
                    <div className='song-title'>
                        <div className="thumbnail-container">
                            {renderThumbnail}
                           <div className="dynamic-display"> {isThisSongPlaying && <GiPauseButton className='display-on-thumbnail' onClick={onPause} />} </div>
                           <div className="dynamic-display">  {isMouseOn && !isThisSongPlaying && <IoPlay className='display-on-thumbnail' onClick={onPlay} />} </div>
                        </div>
                        <div className="artist">{artist}</div>
                        <div className={`song-name ${currentlyPlaying}`}>{songName}</div>
                    </div>

                    <button className="add dynamic-display" onClick={onAdd}>Add</button>
                    <IoMdMore className=" img-more mobile-display" Click={onAdd} />
                </div>
            }

        </div>

    )
}


