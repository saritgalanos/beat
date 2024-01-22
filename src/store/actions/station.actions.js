import { stationService } from "../../services/station.service";
import { ADD_STATION, REMOVE_STATION, SET_FILTER_BY, SET_STATIONS, UNDO_CHANGES, UPDATE_STATION } from "../reducers/station.reducer";
import { store } from "../store";


export async function loadStations() {

    const filterBy = store.getState().stationModule.filterBy
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch({ 
            type: SET_STATIONS, 
            stations })
    } catch (err) {
        console.log('loadStations failed:', err);
        throw err
    }

}

export async function saveStation(stationToSave) {
    const type = stationToSave._id ? UPDATE_STATION : ADD_STATION
    try {
        const savedStation = await stationService.save(stationToSave)
        store.dispatch({
             type, 
             station: savedStation
         })
         return savedStation;
    } catch (err) {
        console.log('saveStation failed:', err);
        throw err
    } finally {
       // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}
