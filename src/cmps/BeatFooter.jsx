import { useEffect, useState } from "react"
import { Player } from "./Player"
import { useSelector } from "react-redux"

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'
import { BeatMobileNav } from "./BeatMobileNav"



export function BeatFooter({ selectedPage }) {
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
        <>
            <div className='footer'>
                <Player />
                <div className='mobile-footer'>
                    <BeatMobileNav selectedPage={selectedPage} />
                </div>
            </div>
        </>

    )
}
