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
    getEmptyStation,
    createSongsListFromSearchResults,
    addSongToStation,
    deleteSongFromStation
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

function addSongToStation(station, newSong) {
    newSong.addedAt = Date.now()
    //add song only if no such id in the list
    const exists = station.songs.find(song => song._id === newSong._id);

    // If the song doesn't exist, add it to the array
    if (exists) {
      console.log('song already in list')
      return station
    }

    const updatedSongs = [...station.songs, newSong]
    const updatedStation = { ...station, songs: updatedSongs };

    return updatedStation;
}

function deleteSongFromStation(station, songToDelete) {
    
    const updatedSongs = station.songs.filter((song) => song._id !== songToDelete._id);
    const updatedStation = { ...station, songs: updatedSongs };
    return updatedStation;
}



function getEmptyStation(stations) {
    const myStationNumber = _getNextStationNumber(stations)
    return {
        _id: '',
        name: `My Playlist #${myStationNumber}`,
        createdBy: {
            _id: utilService.makeId(),
            fullname: loggedinUser.fullname,
            imgUrl: ''
        },
        songs: []
    }
}



function _getNextStationNumber(stations) {
    let highestNumber = 0;
    stations.forEach(station => {
        console.log(station.name)
        if (station.name.startsWith('My Playlist #')) {
            const numberPart = station.name.split('#')[1];

            // Check if the part after '#' is a valid number
            if (!isNaN(numberPart)) {
                const number = parseInt(numberPart, 10);

                // Update highest number if this number is greater
                if (number > highestNumber) {
                    highestNumber = number;
                }
            }
        }
    })
    return highestNumber + 1;
}

function createSongsListFromSearchResults(data) {
    const songs = data.items.map(item => ({
        _id: item.id.videoId,
        title: item.snippet.title,
        url: item.id.videoId,
        imgUrl: item.snippet.thumbnails.default.url,
        addedBy: '',
        addedAt: '',
    }))
    return songs
}



function _createStations() {
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if (!stations || !stations.length) {
        stations = demoDataService.createDemoStations()
        utilService.saveToStorage(STORAGE_KEY, stations)
    }
}


