import {
  FETCH_CVFILE_REQUEST,
  FETCH_CVFILE_SUCCESS,
  FETCH_CVFILE_FAILURE,
  CREATE_CVFILE_REQUEST,
  CREATE_CVFILE_SUCCESS,
  CREATE_CVFILE_FAILURE,    
  DELETE_CVFILE_SUCCESS
} from './cvfileTypes'

const initialState = {
  loading: false,
  data: {},
  cvfile: [],
  error: '',
  isError: false,
}

const cvfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CVFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CVFILE_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        cvfile: action.payload.data,
        error: ''
      }
    case FETCH_CVFILE_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    case CREATE_CVFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_CVFILE_SUCCESS:
      return {
		...state,
        loading: false,
        data: action.payload,
        cvfile: action.payload.data,
        error: '',
		isError: true
      }
    case CREATE_CVFILE_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload.data.error
      }	  	  
    case DELETE_CVFILE_SUCCESS:
	
		//console.log('asdf', action.id)
		//console.log(JSON.stringify(state.cvfile))
		
		//var newArr = state.cvfile.filter(function(obj) {
			//return obj.pk !== action.id;
		//});
		return {
			...state,
			loading: false,
			data: action.payload,
			cvfile: action.payload.data,
			error: ''
		}	  
    default: return state
  }
}

export default cvfileReducer