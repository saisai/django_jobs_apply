import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsTopgun } from '../redux' 

import queryString from 'query-string';

import { clickMEJobsDb } from '../redux'
import { ClickeMeComponent } from './common/ClickeMeComponent'
import Pagination from "react-js-pagination";

function ThJobsTopgunContainer (props) {
	
	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));	
	
	useEffect(() => {
	props.fetchThJobsTopgun(obj)
	}, [])
	
	
	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchThJobsTopgun(obj)
	  
	} 	
  
  return props.thJobsTopgunData.loading ? (

	  <main role="main" className="container">
		<p>Loading</p>
	  </main>

			) : props.thJobsTopgunData.error ? (
				<main role="main" className="container">
					<p>{props.thJobsTopgunData.error}</p>
				  </main>
			) : (
  
			<main role="main" className="container">
				
				<b>Total  </b>: { props.thJobsTopgunData.data.count }
				
				<div className="table-responsive">
				<table className="table">
				  <thead>
					<tr>
					  <th>No</th>
					  <th colSpan="3">Title</th>
					</tr>
				  </thead>
				  <tbody>  
					<ClickeMeComponent data={props.thJobsTopgunData.thjobstopgun} currentPage={props.thJobsTopgunData.data.number} addItemHandler={props.clickMeJobsDb} />
				  </tbody>   
				</table>
				</div>  
				<div className="justify-content-center">
				
				<Pagination			  
						  itemsCountPerPage={100}
						  totalItemsCount={props.thJobsTopgunData.data.count}
						  onChange={(pageNumber) => onChangeHandle(pageNumber)}
						  activePage={props.thJobsTopgunData.data.number}
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
    thJobsTopgunData: state.thjobstopgun,
	
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsTopgun: (pageNumber) => dispatch(fetchThJobsTopgun(pageNumber)),
	clickMeJobsDb: result => dispatch(clickMEJobsDb(result)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThJobsTopgunContainer)
