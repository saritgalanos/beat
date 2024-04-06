import { useContext } from "react"
import { Tooltip } from "@mui/material"
import { deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar'
import { useNavigate } from "react-router"
import { UserContext } from "../contexts/UserContext.js"
import { onToggleModal } from "../store/actions/app.actions.js"
import { MenuModal } from "./MenuModal.jsx"
import { TbSettings } from "react-icons/tb"

export function LoginSignupMobile() {
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    let navigate = useNavigate()

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


    const noUserItems = [
        {
            text: "Log in",
            action: logIn,
            param: undefined,
            itemClass: ''
        },
        {
            text: "Sign up",
            action: SignUp,
            param: undefined,
            itemClass: ''
        },
    ]

    async function onSettingsNoUser() {
        onToggleModal(
            {
                cmp: MenuModal,
                props: {
                    menuItems: noUserItems,
                    position: { top: '60px', right: '40px' }
                }
            })
    }


    async function onSettingWithUser() {
        onToggleModal(
            {
                cmp: MenuModal,
                props: {
                    menuItems: menuItems,
                    position: { top: '60px', right: '40px' }
                }
            })
    }

    async function logIn() {
        onToggleModal(null)
        navigate('/login')
    
    }

    async function SignUp() {
        onToggleModal(null)
        navigate('/signup')
    
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
        <section className="login-signup-mobile">
            {!loggedinUser &&

                <div className='settings' onClick={onSettingsNoUser}>

                    <TbSettings className='settings-img' />
                </div>

            }

            {loggedinUser &&

                <div className='settings' onClick={onSettingWithUser}>

                    <TbSettings className='settings-img' />
                </div>
            }

        </section >

    )
}


