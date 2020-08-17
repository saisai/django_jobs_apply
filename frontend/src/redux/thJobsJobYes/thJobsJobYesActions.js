import axios from 'axios'
import {
  FETCH_THJOBSJOBYES_REQUEST,
  FETCH_THJOBSJOBYES_SUCCESS,
  FETCH_THJOBSJOBYES_FAILURE
} from './thJobsJobYesTypes'


const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';


export const fetchThJobsJobYes = (obj) => {
  return (dispatch) => {
    dispatch(fetchJobsJobYesRequest())
    axios
      .get(`${API_URL}/api/thjobyescoth/?page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchJobsJobYesSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchJobsJobYesFailure(error.message))
      })
  }
}

export const fetchJobsJobYesRequest = () => {
  return {
    type: FETCH_THJOBSJOBYES_REQUEST
  }
}

export const fetchJobsJobYesSuccess = data => {
  return {
    type: FETCH_THJOBSJOBYES_SUCCESS,
    payload: data
  }
}

export const fetchJobsJobYesFailure = error => {
  return {
    type: FETCH_THJOBSJOBYES_FAILURE,
    payload: error
  }
}