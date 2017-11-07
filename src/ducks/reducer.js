import axios from 'axios';

const initialState = {
  first: '',
  last: '',
  email: '',
  hunts: [],
}

const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
    , GET_ALL_HUNTS = 'GET_ALL_HUNTS';

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
