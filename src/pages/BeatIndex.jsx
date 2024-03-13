import { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { BeatNav } from "../cmps/BeatNav"
import { BeatFooter } from "../cmps/BeatFooter"
import { BeatHeader } from "../cmps/BeatHeader"
import { HomePage } from "./HomePage"
import { BeatMobileNav } from "../cmps/BeatMobileNav"
import { LuGhost } from "react-icons/lu"
import { CleanHands } from "@mui/icons-material"
import { DynamicModal } from "../cmps/DynamicModal"
import { stationService } from "../services/station.service"
import { loadLikedSongsStation, loadLikedStations, loadUserStations } from "../store/actions/station.actions"
import { UserContext } from "../contexts/UserContext"




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
        console.log("libWidth" + libWidthToSet)
    }

    return (
        <div className={`main-container  ${libWidth}`}>
            <BeatNav selectedPage={selectedPage} setPage={setPage} onNavWidth={onNavWidth} />


            <Outlet />

            <BeatFooter />
            <BeatMobileNav selectedPage={selectedPage} setPage={setPage} />
            <DynamicModal />

        </div>
    )
}
