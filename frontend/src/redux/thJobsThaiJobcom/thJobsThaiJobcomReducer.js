import {
  FETCH_THJOBSTHAIJOBCOM_REQUEST,
  FETCH_THJOBSTHAIJOBCOM_SUCCESS,
  FETCH_THJOBSTHAIJOBCOM_FAILURE
} from './thJobsThaiJobcomTypes'

const initialState = {
  loading: false,
  data: {},
  thjobsthaijobcom: [],
  error: ''
}

const thJobsThaiJobcomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THJOBSTHAIJOBCOM_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_THJOBSTHAIJOBCOM_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        thjobsthaijobcom: action.payload.data,
        error: ''
      }
    case FETCH_THJOBSTHAIJOBCOM_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default thJobsThaiJobcomReducer