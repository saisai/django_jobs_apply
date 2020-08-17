import axios from 'axios'
import {
  RESET_PASSWORD_CONFIRM_REQUEST,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAILURE
} from './resetPasswordConfirmTypes'


const API_URL = process.env.NODE_ENV === 'production' ? ''  : 'http://192.168.0.150:8000';

export const resetPasswordConfirmAction = (obj) => {
  
  //console.log('helolo', obj.uidb64);
  console.log('hello', obj.token);
  return (dispatch) => {
	 //localStorage.removeItem("token")
    dispatch(resetPasswordConfirmRequest())
    axios
      .post(`${API_URL}/api/password_reset/confirm/`, obj)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(resetPasswordConfirmSuccess(users))
		//history.push("/")
      })
      .catch(error => {
        // error.message is the error message
        dispatch(resetPasswordConfirmFailure(error.message))
      })
  }
}

export const resetPasswordConfirmRequest = () => {
  return {
    type: RESET_PASSWORD_CONFIRM_REQUEST
  }
}

export const resetPasswordConfirmSuccess = data => {
  return {
    type: RESET_PASSWORD_CONFIRM_SUCCESS,
    payload: data
  }
}

export const resetPasswordConfirmFailure = error => {
  return {
    type: RESET_PASSWORD_CONFIRM_FAILURE,
    payload: error
  }
}