import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { BeatNav } from "../cmps/BeatNav"
import { BeatFooter } from "../cmps/BeatFooter"
import { BeatHeader } from "../cmps/BeatHeader"
import { HomePage } from "./HomePage"



export function BeatIndex() {

    const [selectedPage, setSelectedPage] = useState('home')
    useEffect(() => {

    }, [])

    function setPage(page) {
        setSelectedPage(page)
    }



    const isSearch = (selectedPage === 'search') ? true : false

    return (
        <div className="main-container">
            <BeatNav setPage={setPage} />
            {/* <BeatMainContainer /> */}
            <div>
                <BeatHeader isSearch={isSearch} />
                {(selectedPage === 'home') && <HomePage />}
                <Outlet />

            </div>
            <BeatFooter />

        </div>
    )
}
