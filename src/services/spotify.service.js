import { TrackChanges } from "@mui/icons-material"
import { stationService } from "./station.service"
import { utilService } from "./util.service"
import { categoryService } from "./category.services"

export const spotifyService = {
    getSpotifyToken,
    setSpotifyToken,
    login,
    logout,
    fetchPlaylistsForCategory,
    fetchAllStations

}

const CLIENT_ID = "a737078c69ce4f92b0b55aab65b6690e"
const REDIRECT_URI = 'http://localhost:5173/beat'
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"
const SPOTIFY_TOKEN = "spotify-token"



//get the token from local storage 
function getSpotifyToken() {
    return window.localStorage.getItem(SPOTIFY_TOKEN)
}

function setSpotifyToken(newToken) {
    window.localStorage.setItem(SPOTIFY_TOKEN, newToken)
}

function login() {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
}

function logout() {
    setToken("")
    window.localStorage.removeItem("spotify_token")
}


async function fetchPlaylistsForCategory(categoryId) {
    const accessToken = getSpotifyToken()
    try {
        const playlistsData = await _fetchPlaylistsForCategory(categoryId, accessToken)
        return playlistsData;
    }
    catch(err) {
        console.log('fetchPlaylistsForCategory failed:',err)
    }
}









async function fetchAllStations() {

    const data = await _fetchSpotifyCategoriesPlaylistsAndTracks()
    const spotifyStations = []
    data.map(playlist => {
        const station = _createStationFromSpotifyPlayList(playlist)
        if (station) {
            spotifyStations.push(station)
        }
    })
    return spotifyStations
}


async function _fetchSpotifyCategoriesPlaylistsAndTracks() {

    const accessToken = getSpotifyToken()
    const categories = categoryService.getCategories()
    const spotifyPlayLists = []

    try {
        for (const category of categories) {

            const playlistsData = await _fetchPlaylistsForCategory(category.id, accessToken)

            /*fetch songs only for the first 2 categories*/
            if (category.name === 'Pop' || category.name === 'New Releases')  {
                for (const playlist of playlistsData.playlists.items) {
                    const tracksData = await _fetchTracksForPlaylist(playlist.id, accessToken)
                    playlist.categoryId = category.id  //add category to the PL
                    playlist.tracks = tracksData
                    spotifyPlayLists.push(playlist)
                    await _delay(1500); // Assuming delay is an async function that returns a promise
                    console.log('fetching next item')
                }
            }
        }
    } catch (error) {
        console.error('Error:', error)
    }
    return spotifyPlayLists

}




function _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




async function _fetchPlaylistsForCategory(categoryId, accessToken) {
    const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    // Assuming the playlists are located in data.playlists.items
    const uniquePlaylists = data.playlists.items.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    // Replace the original playlist array with the unique ones
    data.playlists.items = uniquePlaylists;

    return data;
}





async function _fetchTracksForPlaylist(playlistId, accessToken) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
}






function _createStationFromSpotifyPlayList(playlist) {
    console.log('saving playlist:', playlist.name)
    var station = stationService.getEmptyStation()
    if (!_validateStation(playlist))
        return null

    station._id = playlist.id
    station.name = playlist.name
    station.createdBy._id = playlist.owner.id
    station.createdBy.fullname = playlist.owner.display_name
    station.createdBy.imgUrl = '' /*todo*/
    station.imgUrl = playlist.images[0].url
    station.description = playlist.description
    if(playlist.categoryId) {
        station.categoryId = playlist.categoryId
    }

    playlist.tracks.items.slice(0, 40).forEach(song => {
        if (!_validateSong(song)) {
            return
        }
        const songToAdd = {
            id: song.track.id,
            title: `${song.track.name} - ${song.track.artists[0].name}`,
            url: song.track.href,
            imgUrl: song.track.album.images[0].url,
            addedBy: 'spotify',
            addedAt: Date.parse(song.added_at),
            duration: utilService.formatDuration(song.track.duration_ms),
            album: song.track.album.name
        }
        station.songs.push(songToAdd)
    })
    return station
}



function _validateSong(song) {
    if (!song || !song.track) return false

    if (!song.track.id || !song.track.name || !song.track.href || !song.track.duration_ms || !song.added_at) {
        console.log('missing parameters for song')
        return false;
    }

    if (!Array.isArray(song.track.artists) || song.track.artists.length === 0) {
        console.log('missing parameters for artist')
        return false;
    }

    // Ensure album and album.images exist and images is an array with at least one item
    if (!song.track.album || !Array.isArray(song.track.album.images) || song.track.album.images.length === 0) {
        console.log('missing parameters for album')
        return false;
    }

    // Check for the existence of album.name
    if (!song.track.album.name) {
        console.log('missing parameters for album name')
        return false;
    }

    // If all checks pass, the song is valid
    return true;
}


function _validateStation(playlist) {
    // Check if the playlist object is not null or undefined
    if (!playlist) return false;

    // Check for the existence and non-emptiness of direct fields
    if (!playlist.id || !playlist.name || !playlist.description) {
        console.log('missing parameters of station')
        return false;
    }

    // Check for the existence of owner fields
    if (!playlist.owner || !playlist.owner.id || !playlist.owner.display_name) {
        console.log('missing owner of station:', playlist.name)
        return false;
    }

    // Ensure images array exists and has at least one item with a url
    if (!Array.isArray(playlist.images) || playlist.images.length === 0 || !playlist.images[0].url) {
        console.log('missing img data of station:', playlist.name)
        return false;
    }

    // If all checks pass, the playlist is valid for station creation
    return true;
}



//---------------Unused utility functions for spotify-----------------------------
async function _fetchCategoryDetails(categoryId) {
    const url = `https://api.spotify.com/v1/browse/categories/${categoryId}`;
    const accessToken = getSpotifyToken()
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching category details:', error);
    }
}


async function _fetchSpotifyCategories(accessToken) {
    const url = 'https://api.spotify.com/v1/browse/categories'
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
}

async function __fetchPlaylistsForCategory(categoryId, accessToken) {
    const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
}


async function fetchSpotifyCategories() {
    const accessToken = getSpotifyToken()
    const url = 'https://api.spotify.com/v1/browse/categories?limit=50'

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const categoriesData = await response.json();
        console.log("=================fetchSpotifyCategories====================")
        // Extracting and displaying details of each category
        /* categoriesData.categories.items.forEach(category => {
             console.log('Category ID:', category.id);
             console.log('Category Name:', category.name);
             console.log('Category URL:', category.href);
             console.log('Category Icon URL:', category.icons[0].url);
             console.log('----------------------');
         })*/
        console.log(categoriesData.categories.items)
        return categoriesData.categories.items;
    } catch (error) {
        console.error('Error fetching Spotify categories:', error)
    }
}



async function fetchPlaylist(playlistId) {
    const accessToken = getSpotifyToken()
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const playlist = await response.json();
        const station = _createStationFromSpotifyPlayList(playlist)
        return station
    } catch (error) {
        console.error('Error fetching playlist:', error);
        throw error; // Re-throwing the error to be handled by the caller
    }
}



async function fetchSpotifyFeaturedPlaylists() {
    const accessToken = getSpotifyToken()
    const url = 'https://api.spotify.com/v1/browse/featured-playlists';

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("=================fetchSpotifyFeaturedPlaylists====================")
        // Extracting and displaying details of each playlist
        data.playlists.items.forEach(playlist => {
            console.log('Name:', playlist.name);
            console.log('Description:', playlist.description);
            console.log('Playlist URL:', playlist.external_urls.spotify);
            console.log('Image URL:', playlist.images[0].url);
            console.log('----------------------');
        });






        console.log('Featured Playlists:', data.playlists.items);
        return data.playlists.items;
    } catch (error) {
        console.error('Error fetching featured playlists:', error);
    }
}





async function searchPlaylists(query) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent('elton')}&type=playlist`;
    const accessToken = getSpotifyToken()
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json();
        console.log("=================searchPlaylists====================")
        console.log(data)
        return data.playlists.items // Extracting playlist items
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Returning an empty array in case of error
    }
}

