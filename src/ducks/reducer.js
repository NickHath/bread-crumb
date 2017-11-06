import axios from 'axios';

const initialState = {
  hunts: [],
  currentHunt: null,
  currentName: ''
}

const GET_ALL_HUNTS = 'GET_ALL_HUNTS'
    , UPDATE_CURR_HUNT_ID = 'UPDATE_CURR_HUNT_ID'
    , UPDATE_CURR_NAME = 'UPDATE_CURR_NAME';

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case GET_ALL_HUNTS + '_FULFILLED':
      return Object.assign({}, state, { hunts: action.payload });
    case UPDATE_CURR_HUNT_ID:
      return Object.assign({}, state, { currentHunt: action.payload })
    case UPDATE_CURR_NAME:
      return Object.assign({}, state, { currentName: action.payload })
    default: 
      return state;
  }
}

export function getAllHunts() {
  const hunts = axios.get('/scav/hunts').then(res => res.data);
  return {
    type: GET_ALL_HUNTS,
    payload: hunts
  }
}

export function updateCurrHunt(hunt_id) {
  return {
    type: UPDATE_CURR_HUNT_ID,
    payload: hunt_id
  }
}

export function updateCurrName(name) {
  return {
    type: UPDATE_CURR_NAME,
    payload: name
  }
}

