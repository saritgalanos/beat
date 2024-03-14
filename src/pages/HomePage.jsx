import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { spotifyService } from "../services/spotify.service"
import { StationPreview } from "../cmps/StationPreview"
import { useSelector } from "react-redux"
import { loadUserStations } from "../store/actions/station.actions"
import { DISNEY_CATEGORY_ID, HIP_HOP_CATEGORY_ID, NETFLIX_CATEGORY_ID, NEW_RELEASES_CATEGORY_ID, PARTY_CATEGORY_ID, POP_CATEGORY_ID, categoryService } from "../services/category.services"
import { ThreeDots } from "react-loader-spinner"
import { stationService } from "../services/station.service"
import { UserContext } from "../contexts/UserContext"
import { useResizeObserver } from "../customHooks/useResizeObserver"
import { useNavigate } from "react-router"



export function HomePage() {

    const userStations = useSelector(storeState => storeState.stationModule.userStations)

    // const [suggestedStations, setSuggestedStations] = useState(null)


    const [newReleasesStations, setNewReleasesStations] = useState(null)
    const [popStations, setPopStations] = useState(null)
    const [hipHopStations, setHipHopStations] = useState(null)
    const [partyStations, setPartyStations] = useState(null)
    const [netflixStations, setNetflixStations] = useState(null)
    const [disneyStations, setDisneyStations] = useState(null)


    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    const mainRef = useRef(null);
    const [mainSize, setMainSize] = useState({ width: undefined, height: undefined })
    const navigate = useNavigate()



    useEffect(() => {

        loadAllStations()

    }, [])

    async function loadAllStations() {
        
        try {
            var stations = null
            var filterBy = stationService.getDefaultFilter()

            filterBy.categoryId = NEW_RELEASES_CATEGORY_ID
            stations = await stationService.query(filterBy)
            setNewReleasesStations(stations)

            filterBy.categoryId = POP_CATEGORY_ID
            stations = await stationService.query(filterBy)
            setPopStations(stations)


            filterBy.categoryId = HIP_HOP_CATEGORY_ID
            stations = await stationService.query(filterBy)
            setHipHopStations(stations)

            filterBy.categoryId = PARTY_CATEGORY_ID
            stations = await stationService.query(filterBy)
            setPartyStations(stations)

            filterBy.categoryId = NETFLIX_CATEGORY_ID
            stations = await stationService.query(filterBy)
            setNetflixStations(stations)

            filterBy.categoryId = DISNEY_CATEGORY_ID
            stations = await stationService.query(filterBy)
            setDisneyStations(stations)


        } catch (error) {
            console.log('loadCategoryStations failed:', error)
        }
    }



    useEffect(() => {
        const updateSize = () => {
            if (mainRef.current) {
                const rect = mainRef.current.getBoundingClientRect();
                setMainSize({ width: rect.width, height: rect.height });
            }
            else {
                const width = (window.innerWidth < 760) ? window.innerWidth - 100 : window.innerWidth - 320
                setMainSize({ width: width, height: window.innerHeight });
            }
        }

        updateSize() // Call initially to get size on mount

        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);






    function getTimeOfDayGreeting() {
        const now = new Date();
        const hour = now.getHours();

        if (hour < 12) {
            return 'Good morning';
        } else if (hour >= 12 && hour < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    }


    function onShowAll(categoryId) {
        navigate(`/genre/${categoryId}`)
    }

    console.log(userStations)

    if (!userStations || 
        !newReleasesStations ||
        !popStations || 
        !hipHopStations ||
        !partyStations ||
        !netflixStations ||
        !disneyStations
       
        ) return (
        <div className="page-center">
            <ThreeDots visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" />
        </div>)


    const stationsToDisplay = userStations
        .filter(station => station.createdBy._id === loggedinUser?._id).slice(0, 6);

    console.log('after:',stationsToDisplay)

    // Calculate the number of stations to display based on the container width
    // This assumes each station preview has a fixed width of 170px and a gap of 24px
    const stationWidthIncludingGap = 170 + 24
    const width = mainSize.width
    const visibleStationCount = width ? Math.floor(width / stationWidthIncludingGap) : popStations?.length




    return (
        <div ref={mainRef} className='home-page main'>
            <BeatHeader isSearch={false} />
            <div className="main-content">
                {getTimeOfDayGreeting()}
            </div>
            {loggedinUser && stationsToDisplay?.length > 0 && <ul className="stations-area">
                <div className="my-stations">
                    {stationsToDisplay.map(station =>
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"homepage"} />
                        </li>
                    )}
                </div>
            </ul>}

            <ul className="suggested-area">
                <div className='section-header'>
                    <a className='fs20 fw700' onClick={()=> onShowAll(NEW_RELEASES_CATEGORY_ID)}>New Releases</a>
                    <a className='fs15 fw700' onClick={()=> onShowAll(NEW_RELEASES_CATEGORY_ID)}>Show All</a>
                </div>
                <div className="stations">
                    {newReleasesStations.slice(0, visibleStationCount).map(station => (
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"category"} />
                        </li>
                    ))}
                </div>
            </ul>

            <ul className="suggested-area">
                <div className='section-header'>
                    <a className='fs20 fw700' onClick={()=> onShowAll(POP_CATEGORY_ID)}>Pop</a>
                    <a className='fs15 fw700' onClick={()=> onShowAll(POP_CATEGORY_ID)}>Show All</a>
                </div>
                <div className="stations">
                    {popStations.slice(0, visibleStationCount).map(station => (
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"category"} />
                        </li>
                    ))}
                </div>
            </ul>

            <ul className="suggested-area">
                <div className='section-header'>
                    <a className='fs20 fw700' onClick={()=> onShowAll(HIP_HOP_CATEGORY_ID)}>Hip Hop</a>
                    <a className='fs15 fw700' onClick={()=> onShowAll(HIP_HOP_CATEGORY_ID)}>Show All</a>
                </div>
                <div className="stations">
                    {hipHopStations.slice(0, visibleStationCount).map(station => (
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"category"} />
                        </li>
                    ))}
                </div>
            </ul>

            <ul className="suggested-area">
                <div className='section-header'>
                    <a className='fs20 fw700' onClick={()=> onShowAll(PARTY_CATEGORY_ID)}>Party</a>
                    <a className='fs15 fw700' onClick={()=> onShowAll(PARTY_CATEGORY_ID)}>Show All</a>
                </div>
                <div className="stations">
                    {partyStations.slice(0, visibleStationCount).map(station => (
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"category"} />
                        </li>
                    ))}
                </div>
            </ul>

            <ul className="suggested-area">
                <div className='section-header'>
                    <a className='fs20 fw700' onClick={()=> onShowAll(NETFLIX_CATEGORY_ID)}>Netflix</a>
                    <a className='fs15 fw700' onClick={()=> onShowAll(NETFLIX_CATEGORY_ID)}>Show All</a>
                </div>
                <div className="stations">
                    {netflixStations.slice(0, visibleStationCount).map(station => (
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"category"} />
                        </li>
                    ))}
                </div>
            </ul>

            <ul className="suggested-area">
                <div className='section-header'>
                    <a className='fs20 fw700' onClick={()=> onShowAll(DISNEY_CATEGORY_ID)}>Disney</a>
                    <a className='fs15 fw700' onClick={()=> onShowAll(DISNEY_CATEGORY_ID)}>Show All</a>
                </div>
                <div className="stations">
                    {disneyStations.slice(0, visibleStationCount).map(station => (
                        <li key={station._id}>
                            <StationPreview station={station} displayOn={"category"} />
                        </li>
                    ))}
                </div>
            </ul>


        </div>
    )
}
