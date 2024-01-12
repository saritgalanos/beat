import { useEffect, useState } from "react"
import { BeatNav } from "../cmps/BeatNav"
import { BeatFooter } from "../cmps/BeatFooter"
import { BeatMainContainer } from "./BeatMainContainer"


export function BeatIndex() {
    
    useEffect(() => {
       
    }, [])


    
    return (
        <div className="main-container">
          <BeatNav />
          <BeatMainContainer />
          <BeatFooter />

        </div>
    )
}
