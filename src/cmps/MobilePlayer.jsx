import { useContext, useEffect, useState } from "react"
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5"
import { useSelector } from "react-redux"
import { UserContext } from "../contexts/UserContext"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { stationService } from "../services/station.service"


export function MobilePlayer() {

    const activeSong = useSelector(state => state.playerModule.activeSong)
    const isPlaying = useSelector(state => state.playerModule.isPlaying)
    const activeStationId = useSelector(state => state.playerModule.activeStationId)
    const likedSongsStation = useSelector(state => state.stationModule.likedSongsStation);
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    const [progress, setProgress] = useState(0)
    const [activeStation, setActiveStation] = useState(0)

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

    function onPlay() { }
    function onPause() { }
    function toggleLike() { }

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

    const isLiked = likedSongsStation?.songs?.find(likedSong => activeSong?.id === likedSong?.id);
    return (
        <div className="mobile-player">
            {(activeSong !== null) &&
                < div className="player-bar">
                    <section className="currently-playing-preview">
                        <div className='song-title'>
                            {renderThumbnail}
                            <div className="song-name fs13">{songName}</div>
                            <div className="artist fs13">{artist}</div>
                        </div>

                        {isLiked ?
                            <IoMdHeart className="heart" onClick={toggleLike} /> :
                            <IoMdHeartEmpty className="heart" onClick={toggleLike} />

                        }

                        {isPlaying ?
                            <IoPauseSharp className="control" onClick={onPause} /> :
                            <IoPlaySharp className="control" onClick={onPlay} />
                        }

                    </section>




                </div>}
        </div >
    )

}