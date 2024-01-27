import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { BeatNav } from "../cmps/BeatNav"
import { BeatFooter } from "../cmps/BeatFooter"
import { BeatHeader } from "../cmps/BeatHeader"
import { HomePage } from "./HomePage"
import { BeatMobileNav } from "../cmps/BeatMobileNav"



export function BeatIndex() {

    const [selectedPage, setSelectedPage] = useState('home')

    useEffect(() => {

    }, [])

    function setPage(page) {
        setSelectedPage(page)
    }


    return (
        <div className="main-container">
            <BeatNav selectedPage={selectedPage} setPage={setPage} />
            <BeatMobileNav selectedPage={selectedPage} setPage={setPage} />
            <div>
                <Outlet />
            </div>
            <BeatFooter />
            <BeatMobileNav/>

        </div>
    )
}
