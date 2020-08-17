import axios from 'axios'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './loginTypes'


const API_URL = process.env.NODE_ENV === "production" ? "" : 'http://192.168.0.150:8000';

export const loginAction = (obj) => {
  
  console.log(obj);
  return (dispatch) => {
	 localStorage.removeItem("token")
    dispatch(loginRequest())
    axios
      .post(`${API_URL}/api/token/obtain/`, obj)
      .then(response => {
        // response.data is the users
        const users = response.data
		console.log('hello', users.id)
		console.log('hello', users.email)
		console.log(response.data.access)
		localStorage.setItem("token", response.data.access)
		localStorage.setItem("id", response.data.id) // set user id
        dispatch(loginSuccess(users))
		//history.push("/")
      })
      .catch(error => {
        // error.message is the error message
        dispatch(loginFailure(error.message))
      })
  }
}

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}