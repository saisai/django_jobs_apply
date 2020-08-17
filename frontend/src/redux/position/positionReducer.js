import {
  FETCH_POSITION_REQUEST,
  FETCH_POSITION_SUCCESS,
  FETCH_POSITION_FAILURE,
  DELETE_POSITION_SUCCESS
} from './positionTypes'

const initialState = {
  loading: false,
  data: {},
  position: [],
  error: ''
}

const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSITION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_POSITION_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        position: action.payload.data,
        error: ''
      }
    case FETCH_POSITION_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    case DELETE_POSITION_SUCCESS: 
		return {
			...state,		
			data: action.payload,
			position: action.payload.data
			
		}	
		/*	
		var newArr = state.position.filter(function(obj) {
			return obj.pk !== action.id;
		});
		return {
			...state,
			position: newArr
		}	  
		*/
    default: return state
  }
}

export default positionReducer