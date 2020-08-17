import {
  FETCH_THJOBSJOBTHAIWEB_REQUEST,
  FETCH_THJOBSJOBTHAIWEB_SUCCESS,
  FETCH_THJOBSJOBTHAIWEB_FAILURE
} from './thJobsJobThaiWebTypes'

const initialState = {
  loading: false,
  data: {},
  thjobsjobthaiweb: [],
  error: ''
}

const thJobsJobThaiWebReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THJOBSJOBTHAIWEB_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_THJOBSJOBTHAIWEB_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        thjobsjobthaiweb: action.payload.data,
        error: ''
      }
    case FETCH_THJOBSJOBTHAIWEB_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default thJobsJobThaiWebReducer