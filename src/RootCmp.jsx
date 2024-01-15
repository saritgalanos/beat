import React from 'react'
import { Routes, Route } from 'react-router'

//import routes from './routes'
import { BeatIndex } from './pages/BeatIndex'
import { SearchPage } from './pages/SearchPage'
import { HomePage } from './pages/HomePage'
export function RootCmp() {

    return (
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<BeatIndex />} >
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />


                    </Route>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                </Routes>
            </main>
        </div>
    )
}


