import { useEffect, useState } from "react"
import { GoHomeFill, GoHome } from "react-icons/go"
import { BiSolidSearchAlt2, BiSearchAlt2 } from "react-icons/bi"
import { useNavigate } from "react-router"
import { IoLibraryOutline } from "react-icons/io5"
import { GrAppleAppStore } from "react-icons/gr"

export function BeatMobileNav({ selectedPage, setPage }) {
    const navigate = useNavigate()
    useEffect(() => {

    }, [])

    function onClickHome() {
        console.log('onClickHome')
        //setPage('home')
        navigate('/')
    }

    function onClickSearch() {
        console.log('onClickSearch')
        //setPage('search')
        navigate('/search')
    }

    function onClickLib() {
        console.log('onClickLib')
       // setPage('lib')
        navigate('/lib')
    }

    const homeClassName = (selectedPage === 'home') ? "nav-control-item selected" : "nav-control-item"
    const searchClassName = (selectedPage === 'search') ? "nav-control-item selected" : "nav-control-item"
    return (
        <div className="mobile-nav">
            <div className="beat-mobile-nav">
                <div className={homeClassName} onClick={onClickHome}>
                    {(selectedPage === 'home') ?
                        <GoHomeFill className="nav-control-icon" /> :
                        <GoHome className="nav-control-icon" />}
                </div>
                <div className={searchClassName} onClick={onClickSearch}>
                    {(selectedPage === 'search') ?
                        <BiSolidSearchAlt2 className="nav-control-icon" /> :
                        <BiSearchAlt2 className="nav-control-icon" />}
                </div>

                <div className={searchClassName} onClick={onClickLib}>
                    <IoLibraryOutline className='nav-control-icon' />
                </div>
                <div  className={searchClassName} onClick={onClickSearch}>
                    <GrAppleAppStore className='nav-control-icon' />
                </div>



            </div>

        </div>
    )
}
