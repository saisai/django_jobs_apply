import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsDb, clickMEJobsDb } from '../redux'


import queryString from 'query-string';


import { ClickeMeComponent } from './common/ClickeMeComponent'
import Pagination from "react-js-pagination";



function ThJobsDbContainer ( props ) {
	
	
	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));
	
  
	useEffect(() => {
	props.fetchThJobsDb(obj)
	}, [])
  
  
	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchThJobsDb(obj)
	  
	} 
	
	
  
  return props.thJobsDbData.loading ? (
  <main role="main" className="container">
    <p>Loading</p>
  </main>
  ) : props.thJobsDbData.error ? (
    <main role="main" className="container">
    <p>{props.thJobsDbData.error}</p>
	 </main>
  ) : (
  
<main role="main" className="container">

	<b>Total  </b>: { props.thJobsDbData.data.count } 
		
	
	<div className="table-responsive">
	<table className="table">
	  <thead>
		<tr>
		  <th>No</th>
		  <th>Title</th>
		  <th colSpan="2">Update</th>
		</tr>
	  </thead>
	  <tbody>   
			
		<ClickeMeComponent 
			data={props.thJobsDbData.thjobsdb} 
			currentPage={props.thJobsDbData.data.number} 
			addItemHandler={props.clickMeJobsDb} />			
		
	 </tbody>   
	</table>
	</div> 
	<div className="justify-content-center">
	
	<Pagination			  
			  itemsCountPerPage={100}
			  totalItemsCount={props.thJobsDbData.data.count}
			  onChange={(pageNumber) => onChangeHandle(pageNumber)}
			  activePage={props.thJobsDbData.data.number}
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
    thJobsDbData: state.thjobsdb    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsDb: (pageNumber) => dispatch(fetchThJobsDb(pageNumber)),
    clickMeJobsDb: result => dispatch(clickMEJobsDb(result)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThJobsDbContainer)

