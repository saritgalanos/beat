import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"


export function SearchPage() {

    useEffect(() => {

    }, [])



    return (
        <div className='search-page'>  
         <BeatHeader isSearch={true} />
             <h1> Search Results </h1>
        </div>
    )
}
