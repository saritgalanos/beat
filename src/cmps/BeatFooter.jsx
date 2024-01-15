import { useEffect, useState } from "react"
import { Player } from "./Player"


export function BeatFooter() {

    useEffect(() => {

    }, [])



    return (
        <div className="footer beat-footer">
            <section className="currently-playing-preview"> Currently Playing preview</section>
            
            <Player />

            <section className="toolbar"> toolbar </section>
        </div>
    )
}
