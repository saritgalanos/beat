import { useEffect, useState } from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { BiSearchAlt2 } from "react-icons/bi"
import { Tooltip } from "@mui/material"
import { deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar'


export function BeatHeader({ isSearch }) {
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {

    }, [])

     /*temp*/
    function handleSubmit(event) {
        event.preventDefault();
        console.log('handleSubmit')
    }

    /*temp*/
    function handleChange(ev) {
        console.log('handle change')
        // let { value, type } = target
        // console.log(value)
        // if (type === 'number') value = +value
        setSearchValue(ev.target.value)
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
                            <input id="search" name="txt" type="text" placeholder={'What do you want to listen to?'}
                                value={searchValue}
                                onChange={handleChange} />
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
