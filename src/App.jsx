import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { BeatIndex } from './pages/BeatIndex'
import { SearchPage } from './pages/SearchPage'
import { HomePage } from './pages/HomePage'
import { StationDetails } from './pages/StationDetails'
export function App() {

    return (
        <main>
            <Router>
                <Routes>
                    <Route path="/" element={<BeatIndex />} >
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/:stationId" element={<StationDetails />} />
                    </Route>
                </Routes>
            </Router>
        </main>

    )
}


