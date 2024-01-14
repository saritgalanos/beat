import { useEffect, useState } from "react"
import { IoLibraryOutline } from "react-icons/io5"


export function YourLibrary() {

    useEffect(() => {

    }, [])



    return (
        <div className="your-library">
            <div className="nav-control-item">
                <IoLibraryOutline className='nav-control-icon' />
                Your Library
            </div>
        </div>
    )
}
