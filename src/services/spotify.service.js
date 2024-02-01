
export const spotifyService = {
    getSpotifyToken,
    setSpotifyToken,
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
fetchSpotifyCategories() 

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
console.log ( categoriesData.categories.items)
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