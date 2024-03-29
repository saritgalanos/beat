
import YouTube from "react-youtube"
import React, { useState, useRef, useContext, useEffect } from 'react'
import { utilService } from "../services/util.service"
import { IoEllipsisHorizontalSharp, IoPlay } from "react-icons/io5"
import { GiPauseButton } from "react-icons/gi"
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSong, togglePlay } from '../store/actions/player.actions'
import { RiDeleteBin5Line } from "react-icons/ri"
import { IoMdHeart, IoMdHeartEmpty, IoMdMore } from "react-icons/io"
import { Audio } from 'react-loader-spinner'
import { UserContext } from "../contexts/UserContext"
import { stationService } from "../services/station.service"
import { loadLikedSongsStation, loadLikedStations, loadUserStations, saveLikedSongsStation, saveStation } from "../store/actions/station.actions"
import { Draggable } from "react-beautiful-dnd"
import { MenuModal } from "./MenuModal"
import { onToggleModal } from "../store/actions/app.actions"
import { showSuccessMsg } from "../services/event-bus.service"



export function SongPreview({ song, station, index, isPlaylist, onAddSong, onDeleteSong, dragHandleProps }) {

    const [isLiked, setIsLiked] = useState(false)
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)
    const userStations = useSelector(storeState => storeState.stationModule.userStations)

    const [isMouseOn, setMouseOn] = useState(false)
    const playerRef = useRef(null)
    const dispatch = useDispatch()

    const { activeSong, isPlaying } = useSelector(state => state.playerModule);
    const likedSongsStation = useSelector(state => state.stationModule.likedSongsStation);

    const isActive = activeSong && (song.id === activeSong.id)
    const isThisSongPlaying = isActive && isPlaying

    useEffect(() => {
        /*check if this song liked by the user */
        const liked = likedSongsStation?.songs?.find(likedSong => song.id === likedSong.id);
        setIsLiked(liked)
    }, [])

    //temp function
    function onPic() {

        (isActive && isPlaying) ? onPause() : onPlay()
    }

    function onPlay() {
        const stationId = (station) ? station._id : null
        console.log("onPlay-stationId:" + stationId)
        dispatch(setActiveSong(song, stationId))
    }

    function onPause() {
        dispatch(togglePlay())
    }


    function onAdd() {
        onAddSong(song)
    }

    function onRemove(song) {
        onDeleteSong(song)
        onToggleModal(null)

    }

    function onAddSongToStation(station) {
        const updatedStation = stationService.addSongToStation(station, song)
        onToggleModal(null)
        try {
            saveStation(updatedStation)
            showSuccessMsg(`Song added to ${station.name}`)
        } catch (err) {
            Console.log('StationDetails:onAddSong ' + err)
        }
    }



function createBasicMenu() {
    const menuItems = [
        {
            text: "Remove from this playlist",
            action: onRemove,
            param: song,
            itemClass: ''
        },
        {
            text: "Save to your liked songs",
            action: () => { },
            param: undefined,
            itemClass: 'bottom-border'
        },
        {
            text: "Add song to playlist...",
            action: onOpenFullMenu,
            param: undefined,
            itemClass: 'fw500 fs15'
        }
    ]
    return menuItems
}

function createFullMenu() {
    const menuItems = createBasicMenu()
    userStations.forEach((station) => {
        menuItems.push({
            text: station.name,
            action: onAddSongToStation,
            param: station,
            itemClass: ''
        })
    })
    return menuItems
}

function onOpenFullMenu() {
    onToggleModal(null)
    const menuItems = createFullMenu()
    displayMenu(menuItems)
}


/*===============================================================*/

function onMoreActions() {
    const menuItems = createBasicMenu()
    displayMenu(menuItems)
}

function createBasicMenu() {
    const menuItems = [
        {
            text: "Remove from this playlist",
            action: onRemove,
            param: song,
            itemClass: ''
        },
        {
            text: "Save to your liked songs",
            action: () => { },
            param: undefined,
            itemClass: 'bottom-border'
        },
        {
            text: "Add song to playlist...",
            action: onOpenFullMenu,
            param: undefined,
            itemClass: 'fw500 fs15'
        }
    ]
    return menuItems
}

function displayMenu(menuItems) {
    onToggleModal(
        {
            cmp: MenuModal,
            props: {
                menuItems: menuItems,
                position: { top: '360px', right: '100px' }
            }
        })
}


/*============================================================================================*/





async function toggleLike() {
    const updatedStation = (isLiked) ?
        stationService.deleteSongFromStation(likedSongsStation, song) :
        stationService.addSongToStation(likedSongsStation, song)
    console.log('station to update:', updatedStation.songs)
    try {

        await saveLikedSongsStation(updatedStation)
        await loadLikedSongsStation(loggedinUser)
        setIsLiked(!isLiked)

    } catch (err) {
        console.log('Song Preview:toggleLike ' + err)
    }

}


const songDetails = song.title.split('-');
const artist = songDetails[0];
const songName = songDetails[1];

const renderThumbnail = song.imgUrl
    ? <div className="thumbnail" onClick={onPic} style={{ backgroundImage: `url(${song.imgUrl})` }}></div>
    : <div className="pic" onClick={onPic} style={{ backgroundColor: song.randomColor }}></div>;

const isActiveClass = (isActive) ? 'active-song' : ''
const isUserStation = (station?.createdBy._id == loggedinUser?._id) ? true : false

console.log('before render of song')

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

                        <div className='song-title' {...(isUserStation ? dragHandleProps : {})}>
                            {renderThumbnail}
                            <div className="artist">{artist}</div>
                            <div className={`song-name ${isActiveClass}`}>{songName}</div>
                        </div>



                        <div className='album'>{song.album}</div>
                        <div className='date-added'>{utilService.getDateToDisplay(song.addedAt, true)}</div>
                        <div className='liked-area'>

                            <div>  {(!isUserStation && loggedinUser) && (
                                isLiked ? <IoMdHeart className="like unlike" onClick={toggleLike} /> : (
                                    isMouseOn ? <IoMdHeartEmpty className="like" onClick={toggleLike} /> : <></>))}
                            </div>
                        </div>
                        <div> {song.duration} </div>


                        {
                            (isMouseOn && loggedinUser) && <div><IoEllipsisHorizontalSharp className='more-actions' onClick={onMoreActions} /></div>
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



        {
            !isPlaylist &&
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

    </div >

)
}


