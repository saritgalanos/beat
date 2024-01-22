import { useEffect, useState } from "react"
import { BeatHeader } from "../cmps/BeatHeader"
import { SongsSearch } from "../cmps/SongsSearch"



export function SearchPage() {

   

    useEffect(() => {

    }, [])


   

    return (
        <>
            <div className='search-page main'>
                <BeatHeader isSearch={true} />
                <h1> Search Results </h1>

              <SongsSearch showSearch={true} />
            </div>
        </>
    )
}
