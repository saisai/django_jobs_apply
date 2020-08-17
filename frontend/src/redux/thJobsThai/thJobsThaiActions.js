import axios from 'axios'
import {
  FETCH_THJOBSTHAI_REQUEST,
  FETCH_THJOBSTHAI_SUCCESS,
  FETCH_THJOBSTHAI_FAILURE
} from './thJobsThaiTypes'


const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';


export const fetchThJobsThai = (obj) => {
  return (dispatch) => {
    dispatch(fetchThJobsThaiRequest())
    axios
      .get(`${API_URL}/api/thjobsthai/?page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchThJobsThaiSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchThJobsThaiFailure(error.message))
      })
  }
}

export const fetchThJobsThaiRequest = () => {
  return {
    type: FETCH_THJOBSTHAI_REQUEST
  }
}

export const fetchThJobsThaiSuccess = data => {
  return {
    type: FETCH_THJOBSTHAI_SUCCESS,
    payload: data
  }
}

export const fetchThJobsThaiFailure = error => {
  return {
    type: FETCH_THJOBSTHAI_FAILURE,
    payload: error
  }
}