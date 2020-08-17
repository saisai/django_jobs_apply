import axios from 'axios'
import {
  FETCH_THJOBSTHAIJOBCOM_REQUEST,
  FETCH_THJOBSTHAIJOBCOM_SUCCESS,
  FETCH_THJOBSTHAIJOBCOM_FAILURE
} from './thJobsThaiJobcomTypes'


const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';


export const fetchThJobsThaiJobcom = (obj) => {
  return (dispatch) => {
    dispatch(fetchJobsThaiJobcomRequest())
    axios
      .get(`${API_URL}/api/thaijobcom/?page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchJobsThaiJobcomSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchJobsThaiJobcomFailure(error.message))
      })
  }
}

export const fetchJobsThaiJobcomRequest = () => {
  return {
    type: FETCH_THJOBSTHAIJOBCOM_REQUEST
  }
}

export const fetchJobsThaiJobcomSuccess = data => {
  return {
    type: FETCH_THJOBSTHAIJOBCOM_SUCCESS,
    payload: data
  }
}

export const fetchJobsThaiJobcomFailure = error => {
  return {
    type: FETCH_THJOBSTHAIJOBCOM_FAILURE,
    payload: error
  }
}