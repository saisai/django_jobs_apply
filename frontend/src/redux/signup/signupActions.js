import axios from 'axios'
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from './signupTypes'

const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';

export const signupAction = (obj) => {
  
  console.log('hello test', obj);
  return (dispatch) => {
	 localStorage.removeItem("token")
    dispatch(signupRequest())
    axios
      .post(`${API_URL}/api/signup/`, obj)
      .then(response => {
        // response.data is the users
        const users = response.data
		//console.log('hello', users.id)
		//console.log('hello', users.email)
		console.log(response.data)
		//localStorage.setItem("token", response.data.access)
		//localStorage.setItem("id", response.data.id)
        dispatch(signupSuccess(users))
		//history.push("/")
      })
      .catch(error => {
        // error.message is the error message
        //dispatch(signupFailure(error.message))
        dispatch(signupFailure(error))
      })
  }
}

export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST
  }
}

export const signupSuccess = data => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data
  }
}

export const signupFailure = error => {
  return {
    type: SIGNUP_FAILURE,
    payload: error
  }
}