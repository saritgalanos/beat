import { useEffect, useState } from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { BiSearchAlt2 } from "react-icons/bi"
import { Tooltip } from "@mui/material"
import { deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar'
import { FiSearch } from "react-icons/fi"


export function BeatHeader({ isSearch, search, bgColor = null }) {
    const [query, setQuery] = useState('')



    /*temp*/
    function onSearch() {
        search(query)
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            search(query)
        }
    }


    return (
            <div className='beat-header dynamic-display' style={{ backgroundColor: bgColor }}>
                <div className="page-control" >
                    <MdNavigateBefore className='page-control-img' />
                    <MdNavigateNext className='page-control-img' />
                </div>
                {isSearch &&
                    <div className="search-area">
                        <div>
                            <FiSearch className="search-img" onClick={onSearch} />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="What do you want to listen to?"
                            onKeyDown={handleKeyDown}
                        />
                    </div>}

                <div className="avatar">
                    <Tooltip title={
                        <div>
                            Sarit Galanos
                        </div>
                    }>
                        <Avatar className="avatar-circle" sx={{ bgcolor: deepPurple[500] }}>SG</Avatar>
                    </Tooltip>
                </div>


            </div>

        //   </div>
    )
}


