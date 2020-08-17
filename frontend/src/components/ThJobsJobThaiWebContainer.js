import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsJobThaiWeb } from '../redux' 

import queryString from 'query-string';

import { clickMEJobsDb } from '../redux'
import { ClickeMeComponent } from './common/ClickeMeComponent'
import Pagination from "react-js-pagination";

function ThJobsJobThaiWebContainer (props) {
	
	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));	
	
  useEffect(() => {
    props.fetchThJobsJobThaiWeb(obj)
  }, [])
  
	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchThJobsJobThaiWeb(obj)
	  
	}   
  
	
  return props.thJobsJobThaiWebData.loading ? (
	  <main role="main" className="container">
		<p>Loading</p>
	  </main>
  ) : props.thJobsJobThaiWebData.error ? (
    <main role="main" className="container">
		<p>{props.thJobsJobThaiWebData.error}</p>
	  </main>
  ) : (
  
<main role="main" className="container">
	
	<b>Total  </b>: { props.thJobsJobThaiWebData.data.count }
	
	<div className="table-responsive">
	<table className="table">
	  <thead>
		<tr>
		  <th>No</th>
		  <th colSpan="3">Title</th>	  
		</tr>
	  </thead>
	  <tbody>  
		<ClickeMeComponent data={props.thJobsJobThaiWebData.thjobsjobthaiweb} currentPage={props.thJobsJobThaiWebData.data.number} addItemHandler={props.clickMeJobsDb} />
	   
	 </tbody>   
	</table>
	</div>  
	<div className="justify-content-center">
	
	<Pagination			  
			  itemsCountPerPage={100}
			  totalItemsCount={props.thJobsJobThaiWebData.data.count}
			  onChange={(pageNumber) => onChangeHandle(pageNumber)}
			  activePage={props.thJobsJobThaiWebData.data.number}
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
    thJobsJobThaiWebData: state.thjobsjobthaiweb,
	}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsJobThaiWeb: (pageNumber) => dispatch(fetchThJobsJobThaiWeb(pageNumber)),
	clickMeJobsDb: result => dispatch(clickMEJobsDb(result)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThJobsJobThaiWebContainer)
