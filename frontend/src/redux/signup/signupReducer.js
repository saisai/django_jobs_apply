import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from './signupTypes'

const initialState = {
  loading: false,
  data: [],
  error: '',
  isLoggedIn: false,  
}

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
		isLoggedIn: false,
        loading: true
      }
    case SIGNUP_SUCCESS:
      return {
		...state,
        loading: false,
		isLoggedIn: true,
        data: action.payload,
        error: '',
		
      }
    case SIGNUP_FAILURE:
      return {
        loading: false,
		isLoggedIn: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default signupReducer