import { stationService } from "../../services/station.service";
import { ADD_STATION, REMOVE_STATION, SET_FILTER_BY, SET_USER_LIKED_STATIONS, SET_USER_STATIONS, UNDO_CHANGES, UPDATE_STATION } from "../reducers/station.reducer";
import { store } from "../store";



export async function loadUserStations(loggedinUser) {

    if(!loggedinUser) return
    const filterBy = stationService.getDefaultFilter()
    filterBy.creatorId = loggedinUser._id
    try {     
        const stations = await stationService.query(filterBy)
        const likedSongsStation = stations.find(station => station.name === 'Liked Songs');
        const updatedStations = stations.filter(station => station.name !== 'Liked Songs');

        store.dispatch({ 
            type: SET_USER_STATIONS, 
            stations: updatedStations, 
            likedSongsStation:  likedSongsStation
        });
    } catch (err) {
        console.log('loadUserStations failed:', err);
        throw err
    }

}

export async function loadLikedStations(loggedinUser) {

    if(!loggedinUser) return
    const filterBy = stationService.getDefaultFilter()
    filterBy.likedByUserId = loggedinUser._id
    try {     
        const likedStations = await stationService.query(filterBy)

        store.dispatch({ 
            type: SET_USER_LIKED_STATIONS, 
            likedStations: likedStations, 
        });
    } catch (err) {
        console.log('loadUserStations failed:', err);
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

export async function deleteStation(stationToDelete) {
    try {
        console.log (stationToDelete._id)
        await stationService.remove(stationToDelete._id)
        store.dispatch({
            type: REMOVE_STATION, 
             stationId: stationToDelete._id
         })
    } catch (err) {
        console.log('deleteStation failed:', err);
        throw err
    } finally {
       // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}