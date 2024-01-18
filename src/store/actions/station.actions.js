import { stationService } from "../../services/station.service";
import { ADD_STATION, REMOVE_STATION, SET_FILTER_BY, SET_STATIONS, UNDO_CHANGES, UPDATE_STATION } from "../reducers/station.reducer";
import { store } from "../store";


export async function loadStations() {

    const filterBy = store.getState().stationModule.filterBy
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch({ type: SET_STATIONS, stations })
    } catch (err) {
        console.log('Had issues loading stations', err);
        throw err
    } finally {
        // store.dispatch({ type: 'SET_IS_LOADING', isLoading: false })
    }

}