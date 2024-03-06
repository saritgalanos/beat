
import YouTube from "react-youtube"
import React, { useState, useRef, useContext } from 'react'
import { utilService } from "../services/util.service"
import { IoEllipsisHorizontalSharp, IoPlay } from "react-icons/io5"
import { GiPauseButton } from "react-icons/gi"
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSong, togglePlay } from '../store/actions/player.actions'
import { RiDeleteBin5Line } from "react-icons/ri"
import { IoMdHeart, IoMdHeartEmpty, IoMdMore } from "react-icons/io"
import { Audio } from 'react-loader-spinner'
import { UserContext } from "../contexts/UserContext"


export function SongPreview({ song, station, index, isPlaylist, onAddSong, onDeleteSong }) {

    const [songToPreview, setSongToPreview] = useState(song)
    const [songFromStation, setSongFromStation] = useState(station)
    const [isLiked, setIsLiked] = useState(false)
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    const [isMouseOn, setMouseOn] = useState(false)
    const playerRef = useRef(null)
    const dispatch = useDispatch()

    const { activeSong, isPlaying } = useSelector(state => state.playerModule);

    const isActive = activeSong && (songToPreview.id === activeSong.id)
    const isThisSongPlaying = isActive && isPlaying


    //temp function
    function onPic() {

        (isActive && isPlaying) ? onPause() : onPlay()
    }

    function onPlay() {
        const stationId = (songFromStation) ? songFromStation._id : null
        console.log("onPlay-stationId:" + stationId)
        dispatch(setActiveSong(songToPreview, stationId))
    }

    function onPause() {
        dispatch(togglePlay())
    }


    function onAdd() {
        onAddSong(songToPreview)
    }

    function onMoreActions() {
        onDeleteSong(songToPreview)
    }

    function toggleLike() {
        setIsLiked(!isLiked)
    }

    const songDetails = songToPreview.title.split('-');
    const artist = songDetails[0];
    const songName = songDetails[1];

    const renderThumbnail = songToPreview.imgUrl
        ? <div className="thumbnail" onClick={onPic} style={{ backgroundImage: `url(${songToPreview.imgUrl})` }}></div>
        : <div className="pic" onClick={onPic} style={{ backgroundColor: songToPreview.randomColor }}></div>;

    const isActiveClass = (isActive) ? 'active-song' : ''
    const isUserStation = (station.createdBy._id == loggedinUser?._id) ? true : false

    return (
        <div className='song-preview'
            onMouseEnter={() => { setMouseOn(true) }}
            onMouseLeave={() => { setMouseOn(false) }}>

            {isPlaylist &&
                <>
                    <div className="not-for-mobile">
                        < div className="playlist-row" >

                            {
                                isThisSongPlaying ? (
                                    !isMouseOn ? <Audio
                                        height="20"
                                        width="20"
                                        radius="3"
                                        color="green"
                                        ariaLabel="loading"
                                        wrapperStyle
                                        wrapperClass
                                    />
                                        : <GiPauseButton className='index' onClick={onPause} />
                                ) : isMouseOn ? (
                                    <div><IoPlay className='index' onClick={onPlay} /></div>
                                ) : <div className='index'>{index + 1}</div>
                            }
                            <div className='song-title'>
                                {renderThumbnail}
                                <div className="artist">{artist}</div>
                                <div className={`song-name  ${isActiveClass}`}>{songName}</div>
                            </div>
                            <div className='album'>{songToPreview.album}</div>
                            <div className='date-added'>{utilService.getDateToDisplay(songToPreview.addedAt, true)}</div>
                            <div className='liked-area'>

                                <div>  {(!isUserStation) && (
                                    isLiked ? <IoMdHeart className="like unlike" onClick={toggleLike} /> : (
                                    isMouseOn ? <IoMdHeartEmpty className="like" onClick={toggleLike} /> : <></>))}
                                </div>
                            </div>
                            <div> {songToPreview.duration} </div>


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
                                <div className={`song-name ${isActiveClass}`}>{songName}</div>
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
                            <div className="not-for-mobile"> {isThisSongPlaying && <GiPauseButton className='display-on-thumbnail' onClick={onPause} />} </div>
                            <div className="not-for-mobile">  {isMouseOn && !isThisSongPlaying && <IoPlay className='display-on-thumbnail' onClick={onPlay} />} </div>
                        </div>
                        <div className="artist">{artist}</div>
                        <div className={`song-name ${isActiveClass}`}>{songName}</div>
                    </div>

                    {loggedinUser && <button className="add not-for-mobile" onClick={onAdd}>Add</button>}
                    <IoMdMore className=" img-more mobile-display" Click={onAdd} />
                </div>
            }

        </div>

    )
}


