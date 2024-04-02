import { useEffect, useState } from "react"
import { GoHomeFill, GoHome } from "react-icons/go"
import { BiSolidSearchAlt2, BiSearchAlt2 } from "react-icons/bi"
import { useNavigate } from "react-router"
import { VscLibrary } from "react-icons/vsc";
export function BeatMobileNav({ selectedPage }) {
    const navigate = useNavigate()
    useEffect(() => {

    }, [])

    function onClickHome() {
        navigate('/')
    }

    function onClickSearch() {
        navigate('/search')
    }

    function onClickLib() {
        navigate('/lib')
    }

    const homeClassName = (selectedPage === 'home') ? " nav-control-item selected" : " nav-control-item"
    const searchClassName = (selectedPage === 'search') ? " nav-control-item selected" : " nav-control-item"
    return (
        <div className="mobile-nav">
            <div className="beat-mobile-nav">
                <div className={`menu-item {homeClassName}`} onClick={onClickHome}>
                    {(selectedPage === 'home') ?
                        <GoHomeFill className="nav-control-icon" /> :
                        <GoHome className="nav-control-icon" />} Home
                </div>
                <div className={`menu-item {searchClassName}`} onClick={onClickSearch}>
                    {(selectedPage === 'search') ?
                        <BiSolidSearchAlt2 className="nav-control-icon" /> :
                        <BiSearchAlt2 className="nav-control-icon" />} Search
                </div>

                <div className={`menu-item {searchClassName}`} onClick={onClickLib}>
                    < VscLibrary  className='nav-control-icon' /> Your Library
                </div>
               


            </div>

        </div>
    )
}
