import axios from 'axios'
import {
  FETCH_CVFILE_REQUEST,
  FETCH_CVFILE_SUCCESS,
  FETCH_CVFILE_FAILURE,
  CREATE_CVFILE_REQUEST,
  CREATE_CVFILE_SUCCESS,
  CREATE_CVFILE_FAILURE,    
  DELETE_CVFILE_SUCCESS
} from './cvfileTypes'


const API_URL = process.env.NODE_ENV === "production" ? "" : 'http://192.168.0.150:8000';

export const createCvfile = (obj) => {
	//let user_id = localStorage.getItem("id")
  return (dispatch) => {
    dispatch(createCvfileRequest())
    axios
      .post(`${API_URL}/api/cvfile/`, obj)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(createCvfileSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
		//console.log(error.response.data);
        dispatch(createCvfileFailure(error.response))
      })
  }
}

export const createCvfileRequest = () => {
  return {
    type: CREATE_CVFILE_REQUEST
  }
}

export const createCvfileSuccess = data => {
  return {
    type: CREATE_CVFILE_SUCCESS,
    payload: data
  }
}

export const createCvfileFailure = error => {
  return {
    type: CREATE_CVFILE_FAILURE,
    payload: error
  }
}

export const deleteCvfile = id => {
	
	let user_id = localStorage.getItem("id")
	
  return (dispatch) => {
    
    axios.delete(`${API_URL}/api/cvfile/${id}/${user_id}`)
	.then(response => {
		//console.log(response.data)
		const users = response.data
		dispatch(deleteCvfileSuccess(users))	 
	})
	.catch(error => {
		console.log(error.message)
		//dispatch(deleteSelectedRequest(error.message))
	})	
	
	
	 
  }
}

export const deleteCvfileSuccess = data => {
  return {
    type: DELETE_CVFILE_SUCCESS,
	payload: data
    
  }
}

export const fetchCvfile = () => {
	let user_id = localStorage.getItem("id")
  return (dispatch) => {
    dispatch(fetchCvfileRequest())
    axios
      .get(`${API_URL}/api/cvfile/?user_id=${user_id}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchCvfileSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchCvfileFailure(error.message))
      })
  }
}

export const fetchCvfileRequest = () => {
  return {
    type: FETCH_CVFILE_REQUEST
  }
}

export const fetchCvfileSuccess = data => {
  return {
    type: FETCH_CVFILE_SUCCESS,
    payload: data
  }
}

export const fetchCvfileFailure = error => {
  return {
    type: FETCH_CVFILE_FAILURE,
    payload: error
  }
}