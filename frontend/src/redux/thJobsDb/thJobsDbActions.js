import axios from 'axios'
import {
  FETCH_THJOBSDB_REQUEST,
  FETCH_THJOBSDB_SUCCESS,
  FETCH_THJOBSDB_FAILURE,
  CLICK_ME_JOBSDB_REQUEST,
  CLICK_ME_JOBSDB_SUCCESS,
  CLICK_ME_JOBSDB_FAILURE,
} from './thJobsDbTypes'

const API_URL = process.env.NODE_ENV === "production" ? "" : 'http://192.168.0.150:8000';

export const clickMEJobsDb = id => {

	return (dispatch) => {
	dispatch(clickMeJobsDbRequest())	
    axios
      .post(`${API_URL}/api/click_me/`, id)
      .then(response => {
        // response.data is the users
        const users = response.data
		if(users.success === false)
		{
			alert("Already added");
		}
        dispatch(clickMeJobsDbSuccess(users))
      })
      .catch(error => {
          dispatch(clickMeJobsDbFailure(error.message))
      })		
		
		
	}
}

export const clickMeJobsDbRequest = () => {
  return {
    type: CLICK_ME_JOBSDB_REQUEST
  }
}

export const clickMeJobsDbSuccess = data => {
  return {
    type: CLICK_ME_JOBSDB_SUCCESS,
    payload: data
  }
}

export const clickMeJobsDbFailure = error => {
  return {
    type: CLICK_ME_JOBSDB_FAILURE,
    payload: error
  }
}


//export const fetchThJobsDb = (pageNumber=1) => {
export const fetchThJobsDb = (obj) => {
	console.log(obj);
  return (dispatch) => {
    dispatch(fetchThJobsDbRequest())
    axios
      .get(`${API_URL}/api/thjobsdb/?page=${obj.page}&q=${obj.q}`)
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchThJobsDbSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchThJobsDbFailure(error.message))
      })
  }
  
}

export const fetchThJobsDbRequest = () => {
  return {
    type: FETCH_THJOBSDB_REQUEST
  }
}

export const fetchThJobsDbSuccess = data => {
  return {
    type: FETCH_THJOBSDB_SUCCESS,
    payload: data
  }
}

export const fetchThJobsDbFailure = error => {
  return {
    type: FETCH_THJOBSDB_FAILURE,
    payload: error
  }
}