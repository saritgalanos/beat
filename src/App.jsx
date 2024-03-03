import React, { useEffect, useState } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { BeatIndex } from './pages/BeatIndex'
import { SearchPage } from './pages/SearchPage'
import { HomePage } from './pages/HomePage'
import { StationDetails } from './pages/StationDetails'
import { spotifyService } from './services/spotify.service';
import { CategoryDetails } from './pages/CategoryDetails';



export function App() {



    return (
        <>
            <SpotifyAuthenticator />
            <Router>
                <Routes>
                    <Route path="/" element={<BeatIndex />} >
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/genre/:categoryId" element={<CategoryDetails />} />
                        <Route path="/:stationId" element={<StationDetails />} />
                    </Route>
                </Routes>
            </Router>
        </>

    )
}

function SpotifyAuthenticator() {
    const [token, setToken] = useState("")

    useEffect(() => {
        
        if(spotifyService.getSpotifyToken()) {
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