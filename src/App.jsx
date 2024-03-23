import React, { useEffect, useState } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { BeatIndex } from './pages/BeatIndex'
import { SearchPage } from './pages/SearchPage'
import { HomePage } from './pages/HomePage'
import { StationDetails } from './pages/StationDetails'
import { spotifyService } from './services/spotify.service';
import { CategoryDetails } from './pages/CategoryDetails';
import { UserContext } from './contexts/UserContext';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';



export function App() {

    const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())

    return (
        <>
            {/* <SpotifyAuthenticator /> */}
            <Router>
                <UserContext.Provider value={{ loggedinUser, setLoggedinUser }}>
                    <Routes>
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<BeatIndex />} >
                            <Route path="/" element={<HomePage />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/genre/:categoryId" element={<CategoryDetails />} />
                            <Route path="/:stationId" element={<StationDetails />} />
                        </Route>

                    </Routes>
                </UserContext.Provider>
            </Router>
        </>

    )
}


/*this function will move to the server side*/
function SpotifyAuthenticator() {
    const [token, setToken] = useState("")

    useEffect(() => {

        if (spotifyService.getSpotifyToken()) {
            return
        }
        let newToken = null
        const hash = window.location.hash
        console.log(hash)
        if (hash) {
            const tokenParam = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"));
            if (tokenParam && tokenParam.includes("=")) {
                newToken = tokenParam.split("=")[1];
                window.location.hash = ""
            }
        }

        if (newToken) {
            setToken(newToken)
            spotifyService.setSpotifyToken(newToken)

        } else {
            spotifyService.login()
        }
    }, [])


    return (
        <></>
    )
}