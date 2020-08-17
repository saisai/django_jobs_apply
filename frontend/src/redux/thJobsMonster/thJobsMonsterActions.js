import axios from 'axios'
import {
  FETCH_THJOBSMONSTER_REQUEST,
  FETCH_THJOBSMONSTER_SUCCESS,
  FETCH_THJOBSMONSTER_FAILURE
} from './thJobsMonsterTypes'


const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';


export const fetchThJobsMonster = (obj) => {
  return (dispatch) => {
    dispatch(fetchJobsMonsterRequest())
    axios
      .get(`${API_URL}/api/thmonstercoth/?page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchJobsMonsterSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchJobsMonsterFailure(error.message))
      })
  }
}

export const fetchJobsMonsterRequest = () => {
  return {
    type: FETCH_THJOBSMONSTER_REQUEST
  }
}

export const fetchJobsMonsterSuccess = data => {
  return {
    type: FETCH_THJOBSMONSTER_SUCCESS,
    payload: data
  }
}

export const fetchJobsMonsterFailure = error => {
  return {
    type: FETCH_THJOBSMONSTER_FAILURE,
    payload: error
  }
}