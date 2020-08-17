import {
  FETCH_THJOBSTHAI_REQUEST,
  FETCH_THJOBSTHAI_SUCCESS,
  FETCH_THJOBSTHAI_FAILURE
} from './thJobsThaiTypes'

const initialState = {
  loading: false,
  data: {},
  thjobsthai: [],
  error: ''
}

const thJobsThaiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THJOBSTHAI_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_THJOBSTHAI_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        thjobsthai: action.payload.data,
        error: ''
      }
    case FETCH_THJOBSTHAI_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default thJobsThaiReducer