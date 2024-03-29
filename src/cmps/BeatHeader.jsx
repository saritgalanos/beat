import { useContext, useEffect, useState } from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { BiSearchAlt2 } from "react-icons/bi"
import { Tooltip } from "@mui/material"
import { deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar'
import { FiSearch } from "react-icons/fi"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router"
import { UserContext } from "../contexts/UserContext.js"
import { onToggleModal } from "../store/actions/app.actions.js"
import { MenuModal } from "./MenuModal.jsx"


export function BeatHeader({ isSearch, search, bgColor = null, title, displayTitle = false }) {
    const [query, setQuery] = useState('')
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    let navigate = useNavigate()

    /*temp*/
    function onSearch() {
        search(query)
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            search(query)
        }
    }

    function resetSearch() {
        setQuery('')
        search()
    }

    const menuItems = [
        {
            text: "Account",
            action: () => { },
            param: undefined,
            itemClass: ''
        },
        {
            text: "Profile",
            action: () => { },
            param: undefined,
            itemClass: ''
        },
        {
            text: "Setting",
            action: () => { },
            param: undefined,
            itemClass: 'bottom-border'
        },
        {
            text: "Logout",
            action: logOut,
            param: undefined,
            itemClass: ''
        }
       
    ]

    async function onAvatar() {
        onToggleModal(
            {
                cmp: MenuModal,
                props: {
                    menuItems: menuItems,
                    position: { top: '60px', right: '40px' }
                }
            })
    }

    async function logOut() {
        try {
            await userService.logout()
            onToggleModal(null)
            setLoggedinUser(null)
            navigate('/')
        } catch (err) {
            console.log('logOut failed ', err)
        }
    }



    function getInitials(name) {
        const words = name.split(' ');
        let initials = words[0].charAt(0).toUpperCase();
        if (words.length > 1) {
            initials += words[1].charAt(0).toUpperCase();
        }
        return initials;
    }

    return (
        <div className='beat-header not-for-mobile' style={{ backgroundColor: bgColor }}>
            <div className="page-control" >
                <MdNavigateBefore className='page-control-img' onClick={() => navigate(-1)} />
                <MdNavigateNext className='page-control-img' onClick={() => navigate(1)} />
            </div>
            {displayTitle && <div className='fs25 fw700 ls-1'>{title}</div>}
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
                    <div>
                        {query && <IoClose className="close" onClick={resetSearch} />}
                    </div>
                </div>}

            <section className="login-signup-container">
                {!loggedinUser &&
                    <div className='user-not-logged-in'>
                        <div className='signup fs16 fw700' onClick={() => navigate('/signup')}>Sign up</div>
                        <div className='login fs16 fw700' onClick={() => navigate('/login')}>Log in</div>
                    </div>
                }

                {loggedinUser &&
                    <div className="avatar">
                        <Tooltip title={<span style={{ fontSize: '14px', fontWeight: 400 }}>{loggedinUser.fullname}</span>}>
                            <Avatar
                                className="avatar-circle"
                                onClick={onAvatar}
                                sx={{
                                    bgcolor: loggedinUser.imgUrl ? 'transparent' : deepPurple[500],
                                    width: 35, // Adjust width as needed
                                    height: 35, // Adjust height as needed
                                }}
                                src={loggedinUser.imgUrl}
                                alt={loggedinUser.fullname}
                            >
                                {!loggedinUser.imgUrl && getInitials(loggedinUser.fullname)}
                            </Avatar>
                        </Tooltip>

                    </div>}
            </section>

        </div>


    )
}


