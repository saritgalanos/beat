import { useEffect, useState } from "react"
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
import { loadStations } from "../store/actions/station.actions"




export function BeatIndex() {





    const [selectedPage, setSelectedPage] = useState('home')
    const [libWidth, setLibWidth] = useState('normal')  /*other options are 'wide-lib' and 'narrow-wide-lib'*/

    useEffect(() => {
        const filterBy = stationService.getDefaultFilter()
        filterBy.creator = 'Sarit Galanos'
        loadStations(filterBy)
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
