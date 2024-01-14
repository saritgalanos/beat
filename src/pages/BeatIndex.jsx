import { useEffect, useState } from "react"
import { BeatNav } from "../cmps/BeatNav"
import { BeatFooter } from "../cmps/BeatFooter"
import { BeatMainContainer } from "./BeatMainContainer"
import { BeatHeader } from "../cmps/BeatHeader"
import { Home } from "./Home"


export function BeatIndex() {

    useEffect(() => {

    }, [])



    return (
        <div className="main-container">
            <BeatNav />
            {/* <BeatMainContainer /> */}
            <div>
                <BeatHeader />
                <Home />
            </div>
            <BeatFooter />

        </div>
    )
}
