import { useState, useEffect, useContext } from 'react'
import { userService } from '../services/user.service.js'
import { ImgUploader } from '../cmps/ImgUploader.jsx'
import { useNavigate, useParams } from 'react-router'
import { UserContext } from '../contexts/UserContext.js'

export function LogIn() {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)
    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
        } catch (err) {
            console.log('Had issues loading users', err);
        }
    }

    function clearState() {
        setCredentials(userService.getEmptyUser())
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    async function onSubmitForm(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        try {
            const user = await onLogin(credentials)
            if (user) {
                navigate('/')
            }
            else {
                clearState()
                //showErrorMsg(`Cannot login`) 
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function onLogin(credentials) {
        console.log(credentials)
        try {
            const user = await userService.login(credentials)
            if (user) {
                setLoggedinUser(user)
                return user
            }
            else {
                console.log('Cannot login')
            }
            //showSuccessMsg(`Welcome ${user.fullname}`)
        } catch (err) {
            console.log('Cannot login :', err)
            showErrorMsg(`Cannot login`)
            clearState()
        }
    }

    function toggleSignup() {
        setIsSignup(prevIsSignup => !prevIsSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
    }
    if (!users) return "loading..."


    return (
        <div className="login-signup">
            <div className='login-signup-header fs28 fw700'>
                <img src="./beat-logo-small.png" className='beat-logo' alt="Beat Logo" />
                beat
            </div>
            <div className='login-signup-container'>
                <div className='login'>
                    <div className='login-header fs48 fw700 ls-1'>
                        Log in to Beat
                    </div>
                    <form className="login-form" onSubmit={onSubmitForm}>
                        <label htmlFor="username">Email or Username
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                placeholder="Email or Username"
                                onChange={handleChange}
                                required
                                autoFocus
                            /></label>
                        <label htmlFor="password">Password
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            /></label>
                        <button className='btn-login fs14 fw700'>Log In</button>
                    </form>
                    <div className='fs16 fw400 fclr9 ls1'>Don't have an account?</div>

                    <button className="btn-link fs16 ls1" onClick={() => { navigate('../signup') }}>Sign up for Beat</button>
                </div>
            </div>
        </div>
    )
}


