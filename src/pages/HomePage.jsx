import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"


export function HomePage() {

    useEffect(() => {

    }, [])

    return (
        <div className='home-page main'>
            <BeatHeader isSearch={false} />
            <div className="main-content">
                <h1> Good Evening </h1>
            </div>
        </div>
    )
}
