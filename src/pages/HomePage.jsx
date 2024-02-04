import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { spotifyService } from "../services/spotify.service"


export function HomePage() {

    useEffect(() => {

    }, [])

    return (
        <div className='home-page main'>
            <BeatHeader isSearch={false} className="dynamic-display" />
            <div className="main-content">
                <h1> Good Evening </h1>
            </div>
        </div>
    )
}
