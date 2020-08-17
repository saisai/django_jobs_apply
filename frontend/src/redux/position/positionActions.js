import axios from 'axios'
import {
  FETCH_POSITION_REQUEST,
  FETCH_POSITION_SUCCESS,
  FETCH_POSITION_FAILURE,
  DELETE_POSITION_SUCCESS
} from './positionTypes'

const API_URL = process.env.NODE_ENV === "production" ? "" : 'http://192.168.0.150:8000';

export const deletePosition = id => {
	let user_id = localStorage.getItem("id")
  return (dispatch) => {
   
    axios.delete(`${API_URL}/api/position/${id}/${user_id}`)
	.then(response => {
		console.log('rr', response.data)
		const users = response.data
		dispatch(deletePositionSuccess(users))
	})
	.catch(error => {
		console.log(error.message)
	})	
	
	
  
}

}

export const deletePositionSuccess = data => {
  return {
    type: DELETE_POSITION_SUCCESS,
	payload: data 
    
  }
}

export const fetchPosition = () => {
	let user_id = localStorage.getItem("id")
  return (dispatch) => {
    dispatch(fetchPositionRequest())
    axios
      .get(`${API_URL}/api/position/?user_id=${user_id}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchPositionSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchPositionFailure(error.message))
      })
  }
}

export const fetchPositionRequest = () => {
  return {
    type: FETCH_POSITION_REQUEST
  }
}

export const fetchPositionSuccess = data => {
  return {
    type: FETCH_POSITION_SUCCESS,
    payload: data
  }
}

export const fetchPositionFailure = error => {
  return {
    type: FETCH_POSITION_FAILURE,
    payload: error
  }
}