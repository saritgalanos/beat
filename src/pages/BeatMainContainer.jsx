import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { Home } from "./Home"


export function BeatMainContainer() {

    useEffect(() => {

    }, [])



    return (
        <div className="main beat-main-container">  
             <BeatHeader />
             <Home />
        </div>
    )
}
