import axios from 'axios'
import {
  FETCH_THJOBSTOPGUN_REQUEST,
  FETCH_THJOBSTOPGUN_SUCCESS,
  FETCH_THJOBSTOPGUN_FAILURE
} from './thJobsTopgunTypes'


const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';


export const fetchThJobsTopgun = (obj) => {
  return (dispatch) => {
    dispatch(fetchJobsTopgunRequest())
    axios
      .get(`${API_URL}/api/thjobstopgun/?page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchJobsTopgunSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchJobsTopgunFailure(error.message))
      })
  }
}

export const fetchJobsTopgunRequest = () => {
  return {
    type: FETCH_THJOBSTOPGUN_REQUEST
  }
}

export const fetchJobsTopgunSuccess = data => {
  return {
    type: FETCH_THJOBSTOPGUN_SUCCESS,
    payload: data
  }
}

export const fetchJobsTopgunFailure = error => {
  return {
    type: FETCH_THJOBSTOPGUN_FAILURE,
    payload: error
  }
}