import { useEffect, useState } from "react"
import { GoHomeFill, GoHome } from "react-icons/go"
import { BiSolidSearchAlt2, BiSearchAlt2 } from "react-icons/bi"
import { YourLibrary } from "../pages/YourLibrary"

export function BeatNav() {
    const [selectedPage, setSelectedPage] = useState('home')

    useEffect(() => {

    }, [])

    function onClickHome() {
        setSelectedPage('home')
    }

    function onClickSearch() {
        console.log('here')
        setSelectedPage('search')
    }

    const homeClassName = (selectedPage === 'home')? "nav-control-item selected" : "nav-control-item"
    const searchClassName = (selectedPage === 'search')? "nav-control-item selected" : "nav-control-item"


    console.log(selectedPage)
    return (
        <div className="nav beat-nav">
            <div className="main-nav-links">
                <div className={homeClassName} onClick={onClickHome}>
                    {(selectedPage === 'home') ?
                        <GoHomeFill className="nav-control-icon" /> :
                        <GoHome className="nav-control-icon" />}
                    Home
                </div>
                 <div className={searchClassName} onClick={onClickSearch}>     
                    {(selectedPage === 'search') ?
                        <BiSolidSearchAlt2 className="nav-control-icon"/> :
                        <BiSearchAlt2 className="nav-control-icon"/>}
                    Search
                </div>

            </div>
            <YourLibrary />
        </div>
            )
}
