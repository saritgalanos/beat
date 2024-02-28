import { useEffect, useState } from "react"
import { Player } from "./Player"
import { useSelector } from "react-redux"

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'



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
                            <div className="artist fs14">{artist}</div>
                            <div className="song-name fs11">{songName}</div>
                        </div>}
                </section>

                <Player />


                {/* <VolumeControl /> */}



            </div>
        </div>
    )
}
