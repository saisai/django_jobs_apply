import {
  FETCH_THJOBSBKK_REQUEST,
  FETCH_THJOBSBKK_SUCCESS,
  FETCH_THJOBSBKK_FAILURE
} from './thJobsBkkTypes'

const initialState = {
  loading: false,
  data: {},
  thjobsbkk: [],
  error: ''
}

const thJobsBkkReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THJOBSBKK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_THJOBSBKK_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        thjobsbkk: action.payload.data,
        error: ''
      }
    case FETCH_THJOBSBKK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default thJobsBkkReducer