import axios from 'axios'
import {
  FETCH_THJOBSJOBTHAIWEB_REQUEST,
  FETCH_THJOBSJOBTHAIWEB_SUCCESS,
  FETCH_THJOBSJOBTHAIWEB_FAILURE
} from './thJobsJobThaiWebTypes'

const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';

export const fetchThJobsJobThaiWeb = (obj) => {
  return (dispatch) => {
    dispatch(fetchJobsJobThaiWebRequest())
    axios
      .get(`${API_URL}/api/thjobthaiwebcom/?page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchJobsJobThaiWebSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchJobsJobThaiWebFailure(error.message))
      })
  }
}

export const fetchJobsJobThaiWebRequest = () => {
  return {
    type: FETCH_THJOBSJOBTHAIWEB_REQUEST
  }
}

export const fetchJobsJobThaiWebSuccess = data => {
  return {
    type: FETCH_THJOBSJOBTHAIWEB_SUCCESS,
    payload: data
  }
}

export const fetchJobsJobThaiWebFailure = error => {
  return {
    type: FETCH_THJOBSJOBTHAIWEB_FAILURE,
    payload: error
  }
}