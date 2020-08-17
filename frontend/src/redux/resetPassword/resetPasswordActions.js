import axios from 'axios'
import {
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_FAILURE
} from './resetPasswordTypes'


const API_URL = process.env.NODE_ENV === "production" ? "" : 'http://192.168.0.150:8000';


export const resetPasswordAction = (obj) => {
  
  console.log(obj);
  return (dispatch) => {
	 localStorage.removeItem("token")
    dispatch(resetPasswordRequest())
    axios
      .post(`${API_URL}/api/password_reset/`, obj)
      .then(response => {
        
        const users = response.data
        dispatch(resetPasswordSuccess(users))
		
      })
      .catch(error => {
        console.log('error', error.response.data)
        dispatch(resetPasswordFailure(error.response.data))
      })
  }
}

export const resetPasswordRequest = () => {
  return {
    type: RESETPASSWORD_REQUEST
  }
}

export const resetPasswordSuccess = data => {
  return {
    type: RESETPASSWORD_SUCCESS,
    payload: data
  }
}

export const resetPasswordFailure = error => {
  return {
    type: RESETPASSWORD_FAILURE,
    payload: error
  }
}