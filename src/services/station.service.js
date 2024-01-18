import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { demoDataService } from './demo-data.service.js'

const STORAGE_KEY = 'stations'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation
}

///////////////////////////////////////////////////////////////
/*an example for how the JSON looks like*/

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
//////////////////////////////////////////////////////////////////////

const loggedinUser = {
    email: 'saritgalanos@mistermail.com',
    fullname: 'Sarit Galanos'
}

function getLoggedinUser() {
    return loggedinUser
}

_createStations()

async function query(filterBy) {
    let stations = await storageService.query(STORAGE_KEY)
    // if (filterBy) {
    //     let { minBatteryStatus, model = '', type = '' } = filterBy
    //     minBatteryStatus = minBatteryStatus || 0
    //     const regexModelTerm = new RegExp(model, 'i')
    //     robots = robots.filter(robot =>
    //         regexModelTerm.test(robot.model) &&
    //         robot.batteryStatus > minBatteryStatus &&
    //         (!type || type === robot.type)
    //     )
    // }
    return stations
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

function _createStations() {
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if (!stations || !stations.length) {
        stations = demoDataService.createDemoStations()
        utilService.saveToStorage(STORAGE_KEY, stations)
    }
}


