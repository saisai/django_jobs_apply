import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsJobYes } from '../redux' 

import queryString from 'query-string';

import { clickMEJobsDb } from '../redux'
import { ClickeMeComponent } from './common/ClickeMeComponent'
import Pagination from "react-js-pagination";

function ThJobsJobYesContainer (props) {
	
	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));	
	
  useEffect(() => {
    props.fetchThJobsJobYes(obj)
  }, [])
  
	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchThJobsJobYes(obj)
	  
	}     
  
  return props.thJobsJobYesData.loading ? (
  
	  <main role="main" className="container">
		<p>Loading</p>
	  </main>
	  
  ) : props.thJobsJobYesData.error ? (
    <main role="main" className="container">
		<p>{props.thJobsJobYesData.error}</p>
	  </main>
  ) : (
  
<main role="main" className="container">
	
	<b>Total  </b>: { props.thJobsJobYesData.data.count }
	
	<div className="table-responsive">
	<table className="table">
	  <thead>
		<tr>
		  <th>No</th>
		  <th colSpan="3">Title</th>
		</tr>
	  </thead>
	  <tbody>  
		<ClickeMeComponent data={props.thJobsJobYesData.thjobsjobyes} currentPage={props.thJobsJobYesData.data.number} addItemHandler={props.clickMeJobsDb} />
	   
	 </tbody>   
	</table>
	</div>  
	
	<div className="justify-content-center">
	
	<Pagination			  
			  itemsCountPerPage={100}
			  totalItemsCount={props.thJobsJobYesData.data.count}
			  onChange={(pageNumber) => onChangeHandle(pageNumber)}
			  activePage={props.thJobsJobYesData.data.number}
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
    thJobsJobYesData: state.thjobsjobyes,
	
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsJobYes: (pageNumber) => dispatch(fetchThJobsJobYes(pageNumber)),
	clickMeJobsDb: result => dispatch(clickMEJobsDb(result)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThJobsJobYesContainer)
