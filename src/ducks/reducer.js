import axios from 'axios';

const initialState = {
  first: '',
  last: '',
  email: '',
  hunts: [],
  currentHunt: null,
  currentName: ''
}

const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
    , GET_ALL_HUNTS = 'GET_ALL_HUNTS'
    , UPDATE_CURR_HUNT_ID = 'UPDATE_CURR_HUNT_ID'
    , UPDATE_CURR_NAME = 'UPDATE_CURR_NAME'
    , SEND_TASKS = 'SEND_TASKS';

export default function reducer(state=initialState, action) {
  console.log(action.type);
  switch(action.type) {
    case UPDATE_ACCOUNT:
      return Object.assign({}, state, { 
        first: action.payload.first, 
        last: action.payload.last,
        email: action.payload.email
      })
    case GET_ALL_HUNTS + '_FULFILLED':
      return Object.assign({}, state, { hunts: action.payload });
    case UPDATE_CURR_HUNT_ID:
      return Object.assign({}, state, { currentHunt: action.payload })
    case UPDATE_CURR_NAME:
      return Object.assign({}, state, { currentName: action.payload })
    case SEND_TASKS:
      axios.post('/task/create', action.payload);
    // case SEND_TASKS + '_FULFILLED':
      
    default: 
      return state;
  }
}

export function updateAccount(first, last, email) {
  return {
    type: UPDATE_ACCOUNT,
    payload: {
      first,
      last,
      email
    }
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

export function sendTasks(tasks) {
  return {
    type: SEND_TASKS,
    payload: tasks
  }
}
