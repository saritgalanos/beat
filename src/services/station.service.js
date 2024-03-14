import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { demoDataService } from './demo-data.service.js'
import { spotifyService } from './spotify.service.js'

const STORAGE_KEY = 'stations'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    createLikedSongsStation,
    getDefaultFilter,
    createSongsListFromSearchResults,
    addSongToStation,
    deleteSongFromStation,
    isLikedStation,
    unlikeStation,
    likeStation
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
    imgUrl: "http://some-photo",
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

// const loggedinUser = {
//     email: 'saritgalanos@mistermail.com',
//     fullname: 'Sarit Galanos'
// }

function getLoggedinUser() {
    return userService.getLoggedinUser()
}

_createStations()

async function query(filterBy) {


    let stations = await storageService.query(STORAGE_KEY)
    
    if (filterBy.creatorId) {
        stations = stations.filter(station => filterBy.creatorId === station.createdBy._id && station.name !== 'liked songs');
        /*remove the liked songs station*/

    }

    if (filterBy.categoryId) {
        stations = stations.filter(station => {
            return filterBy.categoryId === station?.categoryId
        })
    }

    if(filterBy.likedByUserId) {
         stations = stations.filter(station =>  {
            return station.likedByUsers?.some(user => user._id === filterBy.likedByUserId) 
         });
    }
          
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
        creatorId: '',
        likedByUserId: '',
        categoryId: ''
    }
}

function addSongToStation(station, newSong) {
    console.log('addSongToStation:',station)
    newSong.addedAt = Date.now()
    //add song only if no such id in the list
    const exists = station.songs.find(song => song.id === newSong.id);

    // If the song doesn't exist, add it to the array
    if (exists) {
        console.log('song already in list')
        return station
    }

    const updatedSongs = [...station.songs, newSong]
    const updatedStation = { ...station, songs: updatedSongs };
    console.log('addSongToStation: after',updatedStation)
    return updatedStation;
}

function deleteSongFromStation(station, songToDelete) {

    const updatedSongs = station.songs.filter((song) => song.id !== songToDelete.id);
    const updatedStation = { ...station, songs: updatedSongs };
    return updatedStation;
}

async function likeStation(station) {
    if (!station) return
    if (!station.likedByUsers) {
        station.likedByUsers = []
    }
    const user = getLoggedinUser()
    if (!user) return
    station.likedByUsers.push(user)
    await save(station)

}

async function unlikeStation(station) {
    if (!station) return
    const user = getLoggedinUser()
    if (!user) return

    if (station.likedByUsers) {
        station.likedByUsers = station.likedByUsers.filter(userInArray => userInArray._id !== user._id);
    }

    await save(station)
}

function isLikedStation(station) {
    if (!station) return
    const user = getLoggedinUser()
    if (!user) false
    if (station.likedByUsers) {
        return station.likedByUsers.some(userInArray => userInArray._id === user._id);
    }
    return false;
}

function getEmptyStation(stations, loggedinUser = null) {
    var stationName = ''
    if (stations) {
        stationName = (stations) ? `My Playlist #${_getNextStationNumber(stations)}` : ''
    }
    return {
        _id: '',
        name: stationName,
        description: '',
        imgUrl: '',
        createdBy: {
            _id: (loggedinUser?._id) ? loggedinUser._id : '',
            fullname: (loggedinUser?.fullname) ? loggedinUser.fullname : '',
            imgUrl: '',
        },
        songs: [],
        likedByUsers: []
    }
}

async function createLikedSongsStation(loggedinUser) {
    var station = getEmptyStation(null, loggedinUser)
    station.imgUrl = 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
    station.name = 'Liked Songs'
    return station
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
        id: item.id.videoId,
        title: item.snippet.title,
        url: item.id.videoId,
        imgUrl: item.snippet.thumbnails.default.url,
        addedBy: '',
        addedAt: '',
    }))
    return songs
}



async function _createStations() {
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if (!stations || !stations.length) {
        stations = demoDataService.createDemoStations()
        debugger
        const spotifyStations = await _getSpotifyStations()
        const allStations = [...stations, ...spotifyStations]
        console.log('saving to db')
        utilService.saveToStorage(STORAGE_KEY, allStations)
    }
}


async function _getSpotifyStations() {
    console.log('_getSpotifyStations')
    const spotifyStations = await spotifyService.fetchAllStations()
    return spotifyStations;
}