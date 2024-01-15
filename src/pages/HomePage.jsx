import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"


export function HomePage() {

    useEffect(() => {

    }, [])

    return (
        <div className='home-page'>  
         <BeatHeader isSearch={false} />
             <h1> Good Evening </h1>
        </div>
    )
}
