import {
  FETCH_THJOBSJOBYES_REQUEST,
  FETCH_THJOBSJOBYES_SUCCESS,
  FETCH_THJOBSJOBYES_FAILURE
} from './thJobsJobYesTypes'

const initialState = {
  loading: false,
  data: {},
  thjobsjobyes: [],
  error: ''
}

const thJobsJobYesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THJOBSJOBYES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_THJOBSJOBYES_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        thjobsjobyes: action.payload.data,
        error: ''
      }
    case FETCH_THJOBSJOBYES_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default thJobsJobYesReducer