export const SET_ACTIVE_SONG = 'SET_ACTIVE_SONG';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const STOP = 'STOP';

// Action creator for setting the active song
export function setActiveSong(song, fromStationId) {

    return {
        type: SET_ACTIVE_SONG,
        payload: song,
        stationId: fromStationId
    }
}
// Action creator for toggling play/pause
export function togglePlay() {
    return {
        type: TOGGLE_PLAY
    }
}

// Action creator for stopping the song
export function stop() {
    return {
        type: STOP
    }
}