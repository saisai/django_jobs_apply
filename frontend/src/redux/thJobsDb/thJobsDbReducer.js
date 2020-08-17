import {
  FETCH_THJOBSDB_REQUEST,
  FETCH_THJOBSDB_SUCCESS,
  FETCH_THJOBSDB_FAILURE,
  CLICK_ME_JOBSDB_SUCCESS,
  CLICK_ME_JOBSDB_REQUEST,
  CLICK_ME_JOBSDB_FAILURE
} from './thJobsDbTypes'

const initialState = {
  loading: false,
  data: {},
  thjobsdb: [],
  error: '',
  id: ''
}

const thJobsDbReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THJOBSDB_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_THJOBSDB_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        thjobsdb: action.payload.jobsdb,
        error: ''
      }
    case FETCH_THJOBSDB_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
	case CLICK_ME_JOBSDB_REQUEST:
	  return {
			...state,
			loading: false,
			
	  }	  
	case CLICK_ME_JOBSDB_SUCCESS:
	  return {
			...state,
			loading: false,
			
	  }	
	
	case CLICK_ME_JOBSDB_FAILURE:
	  return {
			...state,
			loading: false,
			error: action.payload
			
	  }
    default: return state
  }
}

export default thJobsDbReducer