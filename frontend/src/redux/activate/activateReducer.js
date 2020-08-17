import {
  ACTIVATE_REQUEST,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAILURE
} from './activateTypes'

const initialState = {
  loading: false,
  data: [],
  error: '',
  isLoggedIn: false,  
}

const activateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_REQUEST:
      return {
        ...state,
		isLoggedIn: false,
        loading: true
      }
    case ACTIVATE_SUCCESS:
      return {
		...state,
        loading: false,
		isLoggedIn: true,
        data: action.payload,
        error: '',
		
      }
    case ACTIVATE_FAILURE:
      return {
        loading: false,
		isLoggedIn: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default activateReducer