
import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { stationReducer } from './reducers/station.reducer.js'



const rootReducer = combineReducers({
    stationModule: stationReducer
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

//for debugging
window.gStore = store

store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



