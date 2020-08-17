import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsThaiJobcom } from '../redux'

import queryString from 'query-string';


import { clickMEJobsDb } from '../redux'
import { ClickeMeComponent } from './common/ClickeMeComponent'
import Pagination from "react-js-pagination";

function ThJobsThaiJobcomContainer (props) {
	
	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));	
	
	useEffect(() => {
	props.fetchThJobsThaiJobcom(obj)
	}, [])
  
  
	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchThJobsThaiJobcom(obj)
	  
	} 
	
  return props.thJobsThaiJobcomData.loading ? (

						  <main role="main" className="container">
							<p>Loading</p>
						  </main>

									) 
								: props.thJobsThaiJobcomData.error ?
								(
							<main role="main" className="container">
								<p>{props.thJobsThaiJobcomData.error}</p>
							  </main>
							) : (
  
							<main role="main" className="container">
								
								<b>Total  </b>: { props.thJobsThaiJobcomData.data.count }
								
								<div className="table-responsive">
								<table className="table">
								  <thead>
									<tr>
									  <th>No</th>
									  <th colSpan="3">Title</th>
									</tr>
								  </thead>
								  <tbody>  
								  
									<ClickeMeComponent data={props.thJobsThaiJobcomData.thjobsthaijobcom} currentPage={props.thJobsThaiJobcomData.data.number} addItemHandler={props.clickMeJobsDb} />
								   
								 </tbody>   
								</table>
								</div>  
								<div className="justify-content-center">
								
								<Pagination			  
										  itemsCountPerPage={100}
										  totalItemsCount={props.thJobsThaiJobcomData.data.count}
										  onChange={(pageNumber) => onChangeHandle(pageNumber)}
										  activePage={props.thJobsThaiJobcomData.data.number}
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
    thJobsThaiJobcomData: state.thjobsthaijobcom,
	
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsThaiJobcom: (pageNumber) => dispatch(fetchThJobsThaiJobcom(pageNumber)),
	clickMeJobsDb: result => dispatch(clickMEJobsDb(result)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThJobsThaiJobcomContainer)
