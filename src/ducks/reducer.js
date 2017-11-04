const initialState = {
  currentHunt: null
}

const UPDATE_CURR_HUNT = 'UPDATE_CURR_HUNT';

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case UPDATE_CURR_HUNT:
      return Object.assign({}, state, { currentHunt: action.payload })
    default: 
      return state;
  }
}

export function updateCurrHunt(hunt_id) {
  return {
    type: UPDATE_CURR_HUNT,
    payload: hunt_id
  }
}