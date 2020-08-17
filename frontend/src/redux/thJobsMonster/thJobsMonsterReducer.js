import {
  FETCH_THJOBSMONSTER_REQUEST,
  FETCH_THJOBSMONSTER_SUCCESS,
  FETCH_THJOBSMONSTER_FAILURE
} from './thJobsMonsterTypes'

const initialState = {
  loading: false,
  data: {},
  thjobsmonster: [],
  error: ''
}

const thJobsMonsterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THJOBSMONSTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_THJOBSMONSTER_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        thjobsmonster: action.payload.data,
        error: ''
      }
    case FETCH_THJOBSMONSTER_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default thJobsMonsterReducer