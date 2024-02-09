import { stationService } from "./station.service"

export const spotifyService = {
    getSpotifyToken,
    setSpotifyToken,
    fetchPlaylistsForCategory,
    fetchPlaylist,

    searchPlaylists,
    login,
    logout,
    fetchSpotifyFeaturedPlaylists,
    fetchSpotifyCategories,
    fetchCategoryDetails,
    fetchSpotifyCategoriesPlaylistsAndTracks

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
    const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
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



function _createStationFromSpotifyPlayList(playlist) {
    console.log(playlist)
    var station = stationService.getEmptyStation()
    station._id = playlist.id
    station.name = playlist.name
    station.createdBy._id = playlist.owner.id
    station.createdBy.fullname = playlist.owner.display_name
    station.createdBy.imgUrl = playlist.images[0].url
    station.description = playlist.description
    playlist.tracks.items.slice(0, 40).forEach(song => {
        const songToAdd = {
            id: song.track.id,
            title: `${song.track.name} - ${song.track.artists[0].name}`,
            url: song.track.href,
            imgUrl: song.track.album.images[0].url,
            addedBy: 'spotify',
            addedAt: Date.parse(song.added_at)
        };
        station.songs.push(songToAdd);
    })


    return station
}




async function searchPlaylists(query) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent('elton')}&type=playlist`;
    const accessToken = getSpotifyToken()
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("=================searchPlaylists====================")
        console.log(data)
        return data.playlists.items; // Extracting playlist items
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Returning an empty array in case of error
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
        console.error('Error fetching Spotify categories:', error);
    }
};





function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function _fetchSpotifyCategories(accessToken) {
    const url = 'https://api.spotify.com/v1/browse/categories'
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
}

async function _fetchPlaylistsForCategory(categoryId, accessToken) {
    const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
}

async function _fetchTracksForPlaylist(playlistId, accessToken) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
}


async function fetchSpotifyCategoriesPlaylistsAndTracks() {
    const accessToken = getSpotifyToken()

    try {
        const categoriesData = await _fetchSpotifyCategories(accessToken);
        for (const category of categoriesData.categories.items) {
            console.log('Category:', category.name);

            const playlistsData = await _fetchPlaylistsForCategory(category.id, accessToken);
            for (const playlist of playlistsData.playlists.items) {
                console.log('Playlist:', playlist.name);

                const tracksData = await _fetchTracksForPlaylist(playlist.id, accessToken);
                console.log('Tracks in this playlist:');
                tracksData.items.forEach(item => {
                    if (item.track) {
                        console.log(' - ', item.track.name);
                    }
                });
                console.log('----------------------');

                await delay(15000); // Wait for 15 seconds
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


async function fetchCategoryDetails(categoryId) {
    const url = `https://api.spotify.com/v1/browse/categories/${categoryId}`;
    const accessToken = getSpotifyToken()
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching category details:', error);
    }
}