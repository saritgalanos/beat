import { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { BeatNav } from "../cmps/BeatNav"
import { BeatFooter } from "../cmps/BeatFooter"
import { BeatMobileNav } from "../cmps/BeatMobileNav"
import { DynamicModal } from "../cmps/DynamicModal"
import { loadLikedSongsStation, loadLikedStations, loadUserStations } from "../store/actions/station.actions"
import { UserContext } from "../contexts/UserContext"
import { Player } from "../cmps/Player"




export function BeatIndex() {

    const [selectedPage, setSelectedPage] = useState('home')
    const [libWidth, setLibWidth] = useState('normal')  /*other options are 'wide-lib' and 'narrow-wide-lib'*/
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    useEffect(() => {
        loadUserStations(loggedinUser)
        loadLikedStations(loggedinUser)
        loadLikedSongsStation(loggedinUser)
    }, [])

    function setPage(page) {
        setSelectedPage(page)
    }

    function onNavWidth(libWidthToSet) {
        setLibWidth(libWidthToSet)
    }


    return (

        <div className={`main-container  ${libWidth}`}>
            <BeatNav selectedPage={selectedPage} setPage={setPage} onNavWidth={onNavWidth} />
            <Outlet />
            <BeatFooter selectedPage={selectedPage}  />
            <DynamicModal />
        </div>

    )
}
