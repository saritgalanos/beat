import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    getStations
}
const minimalUser = {
    id: 'user1',
    fullname: 'full name',
    imgUrl: 'url'
}

const miniUser = 'name'



const station = {
    _id: "5cksxjas89xjsa8xjsa8jxs09",
    name: "Funky Monks",
    tags: ["Funk", "Happy"],
    createdBy: {
        _id: "u101",
        fullname: "Puki Ben David",
        imgUrl: "http://some-photo/"
    },
    likedByUsers: [{ minimalUser }, { minimalUser }],
    songs: [
        {
            id: "s1001",
            title: "The Meters - Cissy Strut",
            url: "youtube/song.mp4",
            imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            addedBy: { minimalUser },
            addedAt: 162521765262
        },
        {
            id: "mUkfiLjooxs",
            title: "The JB's - Pass The Peas",
            url: "youtube/song.mp4",
            imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            addedBy: {}
        },
    ],
    msgs: [
        {
            id: 'm101',
            from: { miniUser },
            txt: 'Manish?'
        }
    ]
}


const loggedinUser = {
    email: 'saritgalanos@mistermail.com',
    fullname: 'Sarit Galanos'
}

function getLoggedinUser() {
    return loggedinUser
}

/*create 3 stations to start with*/
// _createStations()


async function query(filterBy) {

}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}


function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(stationToSave) {
    if (stationToSave._id) {
        return storageService.put(STORAGE_KEY, stationToSave)
    } else {
        return storageService.post(STORAGE_KEY, stationToSave)
    }
}


function getDefaultFilter() {
    return {
        txt: '',
        isRead: '',
        sortBy: ''
    }
}


function getEmptyStation() {
    return {


    }
}

function getStations() {
    return [
        {
            _id: 's101',
            name: 'My Running Songs',
            createdBy: {
                _id: "u101",
                fullname: "Sarit Galanos",
                imgUrl: utilService.getImgUrl('/src/assets/img/square1.jpg')
            }
        },
        {
            _id: 's102',
            name: 'Best for winter',
            createdBy: {
                _id: "u102",
                fullname: "Roni Galanos",
                imgUrl: utilService.getImgUrl('/src/assets/img/square2.jpg')
            }
        },
        {
            _id: 's103',
            name: 'vol4',
            createdBy: {
                _id: "u103",
                fullname: "Dana Or",
                imgUrl: utilService.getImgUrl('/src/assets/img/square3.jpg')
            }
        },
        {
            _id: 's104',
            name: 'Christmas songs',
            createdBy: {
                _id: "u104",
                fullname: "Roni Galanos",
                imgUrl: utilService.getImgUrl('/src/assets/img/square4.jpg')
            }
        },
        {
            _id: 's105', 
            name: 'For my Car',
            createdBy: {
                _id: "u105",
                fullname: "Dan Dan",
                imgUrl: utilService.getImgUrl('/src/assets/img/square5.jpg')
            }
        },
        {
            _id: 's106', 
            name: 'Party songs',
            createdBy: {
                _id: "u106",
                fullname: "Tal Tal",
                imgUrl: ''
            }
        }
    ]
}




