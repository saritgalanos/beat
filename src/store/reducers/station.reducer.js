export const SET_STATIONS = 'SET_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const UNDO_CHANGES = 'UNDO_CHANGES'


const initialState = {
    stations: null,
    filterBy: undefined,
    //lastStations:

}
export function stationReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_STATIONS:
            return {
                ...state,
                stations: action.stations
            }
        case ADD_STATION:
            return {
                ...state,
                stations: [...state.stations, action.station],
                lastStations: [...state.stations]
            }
        case UPDATE_STATION:
            return {
                ...state,
                stations: state.stations.map(station => station.id === action.station.id ? action.station : station)
            }
        case REMOVE_STATION:
            return {
                ...state,
                stations: state.stations.filter(station => station.id !== action.stationId),
                lastStations: [...state.stations]
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