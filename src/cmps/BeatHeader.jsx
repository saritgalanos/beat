import { useEffect, useState } from "react"
import { MdNavigateBefore, MdNavigateNext  } from "react-icons/md";


export function BeatHeader() {

    useEffect(() => {

    }, [])



    return (
        <div className="beat-header">
            <div className="page-control" >
                <MdNavigateBefore className='page-control-img' />
                <MdNavigateNext  className='page-control-img' />
            </div>
        </div>
    )
}
