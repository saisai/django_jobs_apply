import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './loginTypes'

const initialState = {
  loading: false,
  data: [],
  error: '',
  isLoggedIn: false,  
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
		isLoggedIn: false,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
		...state,
        loading: false,
		isLoggedIn: true,
        data: action.payload,
        error: '',
		
      }
    case LOGIN_FAILURE:
      return {
        loading: false,
		isLoggedIn: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default loginReducer