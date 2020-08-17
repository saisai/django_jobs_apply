import {
  RESET_PASSWORD_CONFIRM_REQUEST,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAILURE
} from './resetPasswordConfirmTypes'

const initialState = {
  loading: false,
  data: [],
  error: '',
  isLoggedIn: false,  
}

const resetPasswordConfirmReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_CONFIRM_REQUEST:
      return {
        ...state,
		isLoggedIn: false,
        loading: true
      }
    case RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
		...state,
        loading: false,
		isLoggedIn: true,
        data: action.payload,
        error: '',
		
      }
    case RESET_PASSWORD_CONFIRM_FAILURE:
      return {
        loading: false,
		isLoggedIn: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default resetPasswordConfirmReducer