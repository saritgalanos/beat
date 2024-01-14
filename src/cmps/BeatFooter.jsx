import { useEffect, useState } from "react"


export function BeatFooter() {

    useEffect(() => {

    }, [])



    return (
        <div className="footer beat-footer">
            <section className="currently-playing-preview"> Currently Playing preview</section>
            <section className="player"> Player Control </section>
            <section className="toolbar"> toolbar </section>
        </div>
    )
}
