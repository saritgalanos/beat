import { useState, useEffect, useContext } from 'react'
import { userService } from '../services/user.service.js'

import { useNavigate, useParams } from 'react-router'
import { UserContext } from '../contexts/UserContext.js'
import { stationService } from '../services/station.service.js'
import { saveLikedSongsStation } from '../store/actions/station.actions.js'
import { ThreeDots } from 'react-loader-spinner'
import { LiaUserEditSolid } from "react-icons/lia"
import { Tooltip } from "@mui/material"
import { uploadService } from '../services/upload.service.js'
import { IoArrowBack } from "react-icons/io5"


export function SignUp() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const { loggedinUser, setLoggedinUser } = useContext(UserContext)

    // const [imgData, setImgData] = useState({
    //     imgUrl: null,
    //     height: 500,
    //     width: 500,
    // })

    const [isUploading, setIsUploading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

    }, [])


    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        //setImgData({ imgUrl: secure_url, width, height })
        setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl: secure_url }))
        setIsUploading(false)
    }


    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    async function onSubmitForm(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await onSignup(credentials)
        navigate('/')
    }

    async function onSignup(credentials) {
        try {
            const user = await userService.signup(credentials)
            setLoggedinUser(user)
            /*create empty station for like songs for the user*/
            const likedSongsStation = await stationService.createLikedSongsStation(user)
            await saveLikedSongsStation(likedSongsStation)

        } catch (err) {
            console.log('Cannot signup :', err)
            showErrorMsg(`Cannot signup`)
        }
    }


    function onUploaded(imgUrl) {
        setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
    }

    return (
        <div className="signup-page">
            <div className='signup-header fs28 fw700' onClick={() => { navigate('/') }}>
                <img src="./beat-logo-small.png" className='beat-logo' alt="Beat Logo" />
                beat
            </div>
            <div className='signup-container'>
                <div className="page-control" >
                    <IoArrowBack className='page-control-img' onClick={() => navigate(-1)} />
                </div>

                <div className='signup'>

                    <div className='signup-header fs48 fw700 ls-1'>
                        Sign up to start listening
                    </div>

                    <div className="user-img" onClick={() => document.getElementById('imgUpload').click()}>
                        {isUploading ? (
                            <div className="no-user-img">
                                <ThreeDots visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" />
                            </div>) :
                            (
                                // <Tooltip title="select a profile picture" placement="right">
                                <Tooltip placement="right" title={<span style={{ fontSize: '12px', fontWeight: 400, color: '#ffff' }}>Choose a profile picture</span>}>
                                    <div className='img-container'>
                                        < input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
                                        {credentials.imgUrl
                                            ? <img src={credentials.imgUrl} className='user-img' />
                                            : <LiaUserEditSolid className='no-user-img' />
                                        }
                                    </div>
                                </Tooltip>
                            )}
                    </div>















                    <form className="signup-form" onSubmit={onSubmitForm}>
                        <label htmlFor="fullname">Full Name
                            <input
                                type="text"
                                name="fullname"
                                value={credentials.fullname}
                                placeholder="fullname"
                                onChange={handleChange}
                                required
                                autoFocus
                            /></label>


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
                        <label htmlFor="password">Create a password
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            /></label>
                        <button className='btn-login fs14 fw700'>Sign Up</button>
                    </form>
                    <div className='fs16 fw400 fclr9 ls1'>Already have an account?</div>

                    <button className="btn-link fs16 ls1" onClick={() => { navigate('../login/') }}>Login to Beat</button>

                </div>

            </div>
        </div>
    )
}

