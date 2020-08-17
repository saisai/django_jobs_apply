import axios from 'axios'
import {
  ACTIVATE_REQUEST,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAILURE
} from './activateTypes'


const API_URL = process.env.NODE_ENV === "production" ? "" : 'http://192.168.0.150:8000';

export const activateAction = (obj) => {
  
  console.log('helolo', obj.uidb64);
  console.log('hello', obj.token);
  return (dispatch) => {
	 //localStorage.removeItem("token")
    dispatch(activateRequest())
    axios
      .get(`${API_URL}/api/activate/${obj.uidb64}/${obj.token}/`)
      .then(response => {
        // response.data is the users
        const users = response.data
		
        dispatch(activateSuccess(users))
		//history.push("/")
      })
      .catch(error => {
        // error.message is the error message
        dispatch(activateFailure(error.message))
      })
  }
}

export const activateRequest = () => {
  return {
    type: ACTIVATE_REQUEST
  }
}

export const activateSuccess = data => {
  return {
    type: ACTIVATE_SUCCESS,
    payload: data
  }
}

export const activateFailure = error => {
  return {
    type: ACTIVATE_FAILURE,
    payload: error
  }
}