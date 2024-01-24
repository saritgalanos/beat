import { useEffect, useState } from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { BiSearchAlt2 } from "react-icons/bi"
import { Tooltip } from "@mui/material"
import { deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar'


export function BeatHeader({ isSearch, search }) {
    const [query, setQuery] = useState('')
    useEffect(() => {

    }, [])

     /*temp*/
    function handleSubmit(event) {
        event.preventDefault();
        search(query)

    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
          search(query)
        }
      }



    return (
        <div className="beat-header">
            <div className="page-control" >
                <MdNavigateBefore className='page-control-img' />
                <MdNavigateNext className='page-control-img' />
            </div>

            <div className="search-area">

                {isSearch &&
                    <form onSubmit={handleSubmit} className="search-form">
                        <BiSearchAlt2 className='search-icon' />
                        <label htmlFor="search">
                            <input 
                            id="search" 
                            name="txt" 
                            type="text" 
                            placeholder={'What do you want to listen to?'}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown} />
                        </label>
                    </form>
                }
            </div>

            <div className="avatar">
                <Tooltip title={
                    <div>
                        Sarit Galanos
                    </div>
                }>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>SG</Avatar>
                </Tooltip>
            </div>


        </div>
    )
}
