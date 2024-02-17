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



export function BeatIndex() {
  




    const [selectedPage, setSelectedPage] = useState('home')
    const [libWidth, setLibWidth] = useState('normal')  /*other options are 'wide-lib' and 'narrow-wide-lib'*/
   

    useEffect(() => {

    }, [])

    function setPage(page) {
        setSelectedPage(page)
    }

    function onNavWidth(libWidthToSet) {
       
        setLibWidth(libWidthToSet)
        console.log("libWidth"+libWidthToSet)
    }
    
    return (
        <div className={`main-container  ${libWidth}`}>
            <BeatNav selectedPage={selectedPage} setPage={setPage} onNavWidth={onNavWidth} />
            <BeatMobileNav selectedPage={selectedPage} setPage={setPage} />
            <div>
                <Outlet />
            </div>
            <BeatFooter />
            <BeatMobileNav/>
            <DynamicModal />

        </div>
    )
}
