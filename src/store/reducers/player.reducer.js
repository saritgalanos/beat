import { SET_ACTIVE_SONG, TOGGLE_PLAY, STOP } from '../actions/player.actions'

const initialState = {
  activeSong: null,
  isPlaying: false,
  activeStationId: null
}

export function playerReducer(state = initialState, action) {

  switch (action.type) {
    
    case SET_ACTIVE_SONG:
      debugger
      // If the clicked song is the same as the active song, toggle its playing state
      if (state.activeSong && (state.activeSong.id === action.payload.id)) {

        return { ...state, isPlaying: !state.isPlaying };
      }
      // If it's a different song, make it the active song and start playing
      return { ...state, activeSong: action.payload, activeStationId: action.stationId, isPlaying: true };

    case TOGGLE_PLAY:
      // Toggle the playing state of the current song
      return { ...state, isPlaying: !state.isPlaying };

    case STOP:
      // Stop the playback but keep the current song active
      return { ...state, isPlaying: false };

    // ... other cases
    default:
      return state;
  }
}
