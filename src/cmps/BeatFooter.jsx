import { useEffect, useState } from "react"
import { Player } from "./Player"
import { useSelector } from "react-redux"


export function BeatFooter() {
    const activeSong = useSelector(state => state.playerModule.activeSong)


    useEffect(() => {

    }, [])

    var songDetails = ''
    var artist = ''
    var songName = ''
    var renderThumbnail = ''
    if (activeSong) {
        songDetails = activeSong.title.split('-')
        artist = songDetails[0]
        songName = songDetails[1]
        renderThumbnail = activeSong?.imgUrl
            ? <div className="thumbnail" style={{ backgroundImage: `url(${activeSong.imgUrl})` }}></div>
            : <div className="pic" style={{ backgroundColor: activeSong.randomColor }}></div>;
    }
    return (
        <div className="footer ">
            <div className="beat-footer">

                <section className="currently-playing-preview">
                    {(activeSong !== null) &&
                        <div className='song-title'>
                            {renderThumbnail}
                            <div className="artist">{artist}</div>
                            <div className="song-name">{songName}</div>
                        </div>}
                </section>

                <Player />

                <section className="toolbar"> toolbar </section>
            </div>
        </div>
    )
}
