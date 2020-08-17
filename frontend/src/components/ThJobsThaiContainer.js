import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsThai } from '../redux'

import queryString from 'query-string';


import { clickMEJobsDb } from '../redux'
import { ClickeMeComponent } from './common/ClickeMeComponent'
import Pagination from "react-js-pagination";

function ThJobsThaiContainer (props) {

	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));	
	
  useEffect(() => {
    props.fetchThJobsThai(obj)
  }, [])
  
	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchThJobsThai(obj)
	  
	}   
  
  return props.thJobsThaiData.loading ? (
    
	  <main role="main" className="container">
		<p>Loading</p>
	  </main>	
	
		) : props.thJobsThaiData.error ? (
		<main role="main" className="container">
		<p>{props.thJobsThaiData.error}</p>
		</main>
	) : (
  
	<main role="main" className="container">
		
		<b>Total  </b>: { props.thJobsThaiData.data.count }
		
		<div className="table-responsive">
		<table className="table">
		  <thead>
			<tr>
			  <th>No</th>
			  <th colSpan="3">Title</th>			  
			</tr>
		  </thead>
		  <tbody>  
		  
		  <ClickeMeComponent data={props.thJobsThaiData.thjobsthai}  currentPage={props.thJobsThaiData.data.number} addItemHandler={props.clickMeJobsDb} />
		   
		 </tbody>   
		</table>
		</div>  
		
		<div className="justify-content-center">
		
		<Pagination			  
				  itemsCountPerPage={100}
				  totalItemsCount={props.thJobsThaiData.data.count}
				  onChange={(pageNumber) => onChangeHandle(pageNumber)}
				  activePage={props.thJobsThaiData.data.number}
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
    thJobsThaiData: state.thjobsthai,
	
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsThai: (pageNumber) => dispatch(fetchThJobsThai(pageNumber)),
	clickMeJobsDb: result => dispatch(clickMEJobsDb(result)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThJobsThaiContainer)
