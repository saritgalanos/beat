import { useEffect, useState } from "react"
import { GoHomeFill, GoHome } from "react-icons/go"
import { BiSolidSearchAlt2, BiSearchAlt2 } from "react-icons/bi"
import { YourLibrary } from "../pages/YourLibrary"
import { useNavigate } from "react-router"

export function BeatNav({ selectedPage, setPage, onNavWidth, isWide }) {
    const navigate = useNavigate()
    useEffect(() => {

    }, [])

    function onClickHome() {
        setPage('home')
        navigate('/')
    }

    function onClickSearch() {
        setPage('search')
        navigate('/search')
    }

    const homeClassName = (selectedPage === 'home') ? "nav-control-item selected" : "nav-control-item"
    const searchClassName = (selectedPage === 'search') ? "nav-control-item selected" : "nav-control-item"
    return (
        <div className='nav'>
            <div className="beat-nav">
                <div className="main-nav-links">
                    <div className={homeClassName} onClick={onClickHome}>
                        {(selectedPage === 'home') ?
                            <GoHomeFill className="nav-control-icon" /> :
                            <GoHome className="nav-control-icon" />}
                        <div className='txt'>Home</div>
                    </div>
                    <div className={searchClassName} onClick={onClickSearch}>
                        {(selectedPage === 'search') ?
                            <BiSolidSearchAlt2 className="nav-control-icon" /> :
                            <BiSearchAlt2 className="nav-control-icon" />}
                        <div className='txt'> Search </div>
                    </div>

                </div>
                <YourLibrary onNavWidth={onNavWidth} isWide={isWide} />
            </div>

        </div>
    )
}
