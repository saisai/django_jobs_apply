import {
  SELECTED_REQUEST,
  SELECTED_SUCCESS,
  SELECTED_FAILURE,
  DELETE_SELECTED_REQUEST,
  DELETE_SELECTED_SUCCESS,
  DELETE_SELECTED_FAILURE,  
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,   
  FIREME_SELECTED_SUCCESS,
} from './selectedTypes'

const initialState = {
  loading: false,
  data: {},
  selected: [],
  count: '',
  error: '',
  id: ''
}

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SELECTED_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        selected: action.payload.data,
        error: ''
      }
    case SELECTED_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    case DELETE_SELECTED_REQUEST:
		return {
			...state,		
			loading: false,		
		}
    case DELETE_SELECTED_SUCCESS:
		return {
			...state,		
			data: action.payload,
			selected: action.payload.data			
		}
    case DELETE_SELECTED_FAILURE:
		return {
			...state,	
			loading: false,
			data: [],
			error: action.payload			
		}	

    case CHECK_EMAIL_REQUEST:
		return {
			...state,		
			loading: false,		
		}
    case CHECK_EMAIL_SUCCESS:
		return {
			...state,		
			data: action.payload,
			selected: action.payload.data,
			error: action.payload.data.success	
		}
    case CHECK_EMAIL_FAILURE:
		return {
			...state,	
			loading: false,
			data: [],
			error: action.payload.data.success			
		}
		
	case FIREME_SELECTED_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload,
			selected: action.payload.data,
			error: ''			
		}

		
    default: return state
  }
}

export default selectedReducer