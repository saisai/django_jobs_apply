import axios from 'axios'
import {
  SELECTED_REQUEST,
  SELECTED_SUCCESS,
  SELECTED_FAILURE,
  DELETE_SELECTED_REQUEST,
  DELETE_SELECTED_SUCCESS,
  DELETE_SELECTED_FAILURE,
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,     
  FIREME_SELECTED_SUCCESS,  
} from './selectedTypes'


const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';

export const checkEmailAction = (obj) => {

  //let user_id = localStorage.getItem("id")
  return (dispatch) => {
    dispatch(checkEmailRequest())
    axios
      .post(`${API_URL}/api/checkemail/`, obj)
      .then(response => {
        // response.data is the users
        //const users = response.data
        dispatch(checkEmaildSuccess(response))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(checkEmailFailure(error.response))
      })
  }
}

export const checkEmailRequest = () => {
  return {
    type: CHECK_EMAIL_REQUEST,	  
  }
}

export const checkEmaildSuccess = data => {
  return {
    type: CHECK_EMAIL_SUCCESS,
	payload: data    
  }
}

export const checkEmailFailure = error => {
  return {
    type: CHECK_EMAIL_FAILURE,
	payload: error    
  }
}


export const firemeSelected = obj => {	
	
  return (dispatch) => {
	
    axios.post(`${API_URL}/api/fire_me/`,obj)
	.then(response => {
		console.log(response.data)
		dispatch(firemeSelectedSuccess(response.data))	
	})
	.catch(error => {
		console.log(error.message)
		
	})
	 
  }
}

export const firemeSelectedSuccess = data => {
  return {
    type: FIREME_SELECTED_SUCCESS,
	payload: data    
  }
}

export const deleteSelected = id => {	
	
  let user_id = localStorage.getItem("id")
  return (dispatch) => {
   
    dispatch(deleteSelectedRequest())
    axios.delete(`${API_URL}/api/selected/${id}/${user_id}`)
	.then(response => {
		//console.log(response.data)
		const users = response.data
		dispatch(deleteSelectedSuccess(users))	 
	})
	.catch(error => {
		console.log(error.message)
		dispatch(deleteSelectedRequest(error.message))
	})
	
  }
}

export const deleteSelectedRequest = () => {
  return {
    type: DELETE_SELECTED_REQUEST,	  
  }
}

export const deleteSelectedSuccess = data => {
  return {
    type: DELETE_SELECTED_SUCCESS,
	payload: data    
  }
}

export const deleteSelectedFailure = error => {
  return {
    type: DELETE_SELECTED_FAILURE,
	payload: error    
  }
}

export const fetchSelected = (obj) => {
	
  // get(`${API_URL}/api/thjobsthai/?page=${obj.page}&q=${obj.q}`)
  let user_id = localStorage.getItem("id")
  return (dispatch) => {
    dispatch(fetchSelectedRequest())
    axios
      .get(`${API_URL}/api/selected/?user_id=${user_id}&page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchSelectedSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchSelectedFailure(error.message))
      })
  }
}

export const fetchSelectedRequest = () => {
  return {
    type: SELECTED_REQUEST
  }
}

export const fetchSelectedSuccess = data => {
  return {
    type: SELECTED_SUCCESS,
    payload: data
  }
}

export const fetchSelectedFailure = error => {
  return {
    type: SELECTED_FAILURE,
    payload: error
  }
}