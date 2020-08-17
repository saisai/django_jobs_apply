import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchSelected, deleteSelected, firemeSelected } from '../redux' 

import queryString from 'query-string';

import Pagination from "react-js-pagination";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { SelectedDataComponent } from './common/SelectedDataComponent'

function SelectedContainer (props) {

	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));	
	
	useEffect(() => {
		props.fetchSelected(obj)
	}, [])
  
  const notify = () => toast.success("Successfully sent");
	
	
	const sendEmail = (id) => {		
		
		props.firemeSelected({'id':id, 'user_id': localStorage.getItem("id")});
		notify();
	}

	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchSelected(obj)
	  
	} 

  
  return props.selectedData.loading ? (
									<main role="main" className="container">
											<p>Loading</p>
									</main>

									) 
									: props.selectedData.error ? 
									( 
									
									<main role="main" className="container">
											<p>{props.selectedData.error}</p>
									</main>									
										
									) 
									: (
  
			<main role="main" className="container">
				<ToastContainer
					position="top-center"
					autoClose={1000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					/>
				<b>Total  </b>: { props.selectedData.data.count }
				
				<div className="table-responsive">
				<table className="table">
				  <thead>
					<tr>
					  <th>No</th>
					  <th colSpan="6">Title</th>					  
					</tr>
				  </thead>
				  <tbody>  
				  			  
				  
				  { (props.selectedData.data.count > 0)  
				  
				  
				  ?	
					<SelectedDataComponent 
					data={props.selectedData.selected} 
					currentPage={props.selectedData.data.number} 
					deleteSelected={props.deleteSelected}
					sendEmail={sendEmail}
					/>	
					:
				
				<tr><td colSpan="7">No data found</td></tr>		  
				  }
				  
				 </tbody>   
				</table>
				</div>  
				
				<div className="justify-content-center">
				
				<Pagination			  
						  itemsCountPerPage={100}
						  totalItemsCount={props.selectedData.data.count}
						  onChange={(pageNumber) => onChangeHandle(pageNumber)}
						  activePage={props.selectedData.data.number}
						  itemClass="page-item"
						  linkClass="page-link"
						  innerClass="pagination justify-content-center"
						/>
				</div>
				 </main>	  

  )
}

const mapStateToProps = state => {
  return {
    selectedData: state.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: obj => dispatch(fetchSelected(obj)),
    deleteSelected: id => dispatch(deleteSelected(id)),
    firemeSelected: obj => dispatch(firemeSelected(obj)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedContainer)
