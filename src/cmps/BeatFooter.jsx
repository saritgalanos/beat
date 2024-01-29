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
                            <div className="artist">{artist}</div>
                            <div className="song-name">{songName}</div>
                        </div>}
                </section>

                <Player />

                <section className="toolbar">
                    <ContinuousSlider />


                </section>
            </div>
        </div>
    )
}



function ContinuousSlider() {
    const [value, setValue] = useState(30);

    //function handleChange(event: Event, newValue: number | number[])  {
    function handleChange(ev) {
        //setValue(newValue as number);
    };

    return (
        <div className='volume-bar'>
            <Box sx={{ width: 200 }}>

                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <VolumeDown />
                    <Slider
                        aria-label="Volume"
                        value={value}
                        onChange={handleChange}
                        sx={{
                            '& .MuiSlider-thumb': {
                                color: 'white', // Change thumb color here
                                width: '12px', // Reduce thumb width here
                                height: '12px', // Reduce thumb height here
                                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                                    boxShadow: 'none', // Remove shadow on focus, hover, and active states
                                }
                            },
                            '& .MuiSlider-track': {
                                color: 'green', // Change track color here
                            },
                            '& .MuiSlider-rail': {
                                color: 'white', // Change rail color here
                            },
                        }} />
                    <VolumeUp />
                </Stack>

            </Box>
        </div>
    )
}