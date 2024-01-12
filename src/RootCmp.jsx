import React from 'react'
import { Routes, Route } from 'react-router'

//import routes from './routes'
import { BeatIndex } from './pages/BeatIndex'

export function RootCmp() {

    return (
        <div>
            {/* <AppHeader /> */}
            <main>
                <Routes>
                    <Route path="/" element={<BeatIndex />} />
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                </Routes>
            </main>
         {/*    <AppFooter /> */}
        </div>
    )
}


