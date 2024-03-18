
import { storageService } from './async-storage.service'


import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/' :
    '//localhost:3030/api/'

const BASE_USER_URL = BASE_URL + 'user/'
const BASE_AUTH_URL = BASE_URL + 'auth/'




const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
export const WORK_REMOTELY = true

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser,
}

window.userService = userService


async function getUsers(filterBy = {}) {
    if (WORK_REMOTELY) {
        var { data: users } = await axios.get(BASE_USER_URL, { params: filterBy })
        return users
    }
    return storageService.query('user')

}



async function getById(userId) {
    if (WORK_REMOTELY) {
        const url = BASE_USER_URL + userId
        var { data: user } = await axios.get(url)
        return user
    }


    const userReturned = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return userReturned
}

async function remove(userId) {
    if (WORK_REMOTELY) {
        const url = BASE_USER_URL + userId
        var { data: res } = await axios.delete(url)
        return res
    }


    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    if (WORK_REMOTELY) {

    }



    const userReturned = await storageService.get('user', _id)

    await storageService.put('user', userReturned)

    // const user = await httpService.put(`user/${_id}`, {_id, score})

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === userReturned._id) saveLocalUser(userReturned)
    return userReturned
}

async function login(userCred) {
    if (WORK_REMOTELY) {
        const { data: user } = await axios.post(BASE_AUTH_URL + 'login', userCred)
        console.log('user', user);
        if (user) {
            return saveLocalUser(user)
        }
    } else {
        const users = await storageService.query('user')
        const localuser = users.find(user => user.username === userCred.username)
        // const user = await httpService.post('auth/login', userCred)
        if (localuser) return saveLocalUser(localuser)
    }
}

async function signup(userCred) {
    if (WORK_REMOTELY) {
        console.log('signup:', userCred)
        const { data: user } = await axios.post(BASE_AUTH_URL + 'signup', userCred)
        return saveLocalUser(user)
    }

    const localuser = await storageService.post('user', userCred)
     return saveLocalUser(localuser)
}

async function logout() {
    if (WORK_REMOTELY) {
        await axios.post(BASE_AUTH_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        return

    }


    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}


function saveLocalUser(user) {
     //user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
   
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}




function getEmptyUser() {
    return {
        username: '',
        fullname: '',
        password: '',
        imgUrl: ''
    }
}
