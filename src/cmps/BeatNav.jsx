import { useEffect, useState, useRef } from "react"
import { GoHomeFill, GoHome } from "react-icons/go"
import { BiSolidSearchAlt2, BiSearchAlt2 } from "react-icons/bi"
import { YourLibrary } from "../pages/YourLibrary"
import { useLocation, useNavigate } from "react-router"
import { useResizeObserver } from "../customHooks/useResizeObserver"

export function BeatNav({ selectedPage, setPage, onNavWidth }) {


    const [ref, size] = useResizeObserver()
    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(() => {
        // Check the current pathname to update selectedPage accordingly
        const path = location.pathname; // Get the current path
        if (path === '/') {
            setPage('home');
        } else if (path === '/search') {
            setPage('search');
        } else {
            // Handle other paths: If the user navigates to a different page, you might want to 'deselect' the navigation items
            setPage(''); // Or any other logic to 'turn off' the navigation items
        }
    }, [location, setPage]); // React to changes in location


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
    const navClass = (size.width > 100) ? "nav-open" : 'nav-closed'

    return (
        <div className='nav'>
            <div className={`beat-nav ${navClass} `} ref={ref}>
                <div className="main-nav-links">
                    <div className='link-item'>
                        <div className={homeClassName} onClick={onClickHome}>
                            {(selectedPage === 'home') ?
                                <GoHomeFill className="nav-control-icon" /> :
                                <GoHome className="nav-control-icon" />}
                            <div className={`txt ${navClass}`}>Home</div>
                        </div>
                    </div>
                    <div className='link-item'>
                        <div className={searchClassName} onClick={onClickSearch}>
                            {(selectedPage === 'search') ?
                                <BiSolidSearchAlt2 className="nav-control-icon" /> :
                                <BiSearchAlt2 className="nav-control-icon" />}
                            <div className={`txt ${navClass}`}> Search </div>
                        </div>
                    </div>

                </div>
                <YourLibrary onNavWidth={onNavWidth} />
            </div>
        </div>
    )
}
