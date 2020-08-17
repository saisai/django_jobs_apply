import {
  FETCH_THJOBSTOPGUN_REQUEST,
  FETCH_THJOBSTOPGUN_SUCCESS,
  FETCH_THJOBSTOPGUN_FAILURE
} from './thJobsTopgunTypes'

const initialState = {
  loading: false,
  data: {},
  thjobstopgun: [],
  error: ''
}

const thJobsTopgunReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THJOBSTOPGUN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_THJOBSTOPGUN_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        thjobstopgun: action.payload.data,
        error: ''
      }
    case FETCH_THJOBSTOPGUN_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default thJobsTopgunReducer