import axios from 'axios'
import {
  FETCH_THJOBSBKK_REQUEST,
  FETCH_THJOBSBKK_SUCCESS,
  FETCH_THJOBSBKK_FAILURE
} from './thJobsBkkTypes'


const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';

export const fetchThJobsBkk = (obj) => {
  return (dispatch) => {
    dispatch(fetchThJobsBkkRequest())
    axios
      .get(`${API_URL}/api/thjobsbkk/?page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchThJobsBkkSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchThJobsBkkFailure(error.message))
      })
  }
}

export const fetchThJobsBkkRequest = () => {
  return {
    type: FETCH_THJOBSBKK_REQUEST
  }
}

export const fetchThJobsBkkSuccess = data => {
  return {
    type: FETCH_THJOBSBKK_SUCCESS,
    payload: data
  }
}

export const fetchThJobsBkkFailure = error => {
  return {
    type: FETCH_THJOBSBKK_FAILURE,
    payload: error
  }
}