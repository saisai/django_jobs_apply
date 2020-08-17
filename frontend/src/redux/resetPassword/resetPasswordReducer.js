import {
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_FAILURE
} from './resetPasswordTypes'

const initialState = {
  loading: false,
  data: [],
  error: '',
  isLoggedIn: false,  
  isError: false,
}

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESETPASSWORD_REQUEST:
      return {
        ...state,
		isLoggedIn: false,
        loading: true,		
      }
    case RESETPASSWORD_SUCCESS:
      return {
		...state,
        loading: false,
		isLoggedIn: true,
		isError: false,
        data: action.payload,
        error: '',
		
      }
    case RESETPASSWORD_FAILURE:
      return {
        loading: false,
		isLoggedIn: false,
		isError: true,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default resetPasswordReducer