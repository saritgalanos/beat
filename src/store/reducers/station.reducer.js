export const SET_USER_STATIONS = 'SET_USER_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const UNDO_CHANGES = 'UNDO_CHANGES'
export const SET_USER_LIKED_STATIONS = 'SET_USER_LIKED_STATIONS'
export const SET_LIKED_SONGS_STATION = 'SET_LIKED_SONGS_STATION'


const initialState = {
    userStations: null,
    userLikedStations: null,
    likedSongsStation: undefined,
}
export function stationReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER_STATIONS:
            return {
                ...state,
                userStations: action.stations,
            }
        case SET_USER_LIKED_STATIONS:
            return {
                ...state,
                userLikedStations: action.likedStations,
            }

        case SET_LIKED_SONGS_STATION:
            return {
                ...state,
                likedSongsStation: action.likedSongsStation
            }
        case ADD_STATION:
            return {
                ...state,
                userStations: [...(state.userStations || []), action.station],
            }
        case UPDATE_STATION:
            return {
                ...state,
                userStations: state.userStations.map(station => station._id === action.station._id ? action.station : station)
            }
        case REMOVE_STATION:
            console.log(action.stationId)
            return {
                ...state,
                userStations: state.userStations.filter(station => station._id !== action.stationId)

            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        // case UNDO_CHANGES:
        //     return {
        //         ...state,
        //         stations: [...state.lastStations]
        //     }

        default:
            return state;
    }
}