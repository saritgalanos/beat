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
    const [isWide, setIsWide] = useState(false)
   

    useEffect(() => {

    }, [])

    function setPage(page) {
        setSelectedPage(page)
    }

    function onNavWidth() {
        setIsWide(!isWide)
    }
    
    const wideClassName = (isWide) ? "wide-library" : ""
    return (
        <div className={`main-container  ${wideClassName}`}>
            <BeatNav selectedPage={selectedPage} setPage={setPage} onNavWidth={onNavWidth} isWide={isWide}/>
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
