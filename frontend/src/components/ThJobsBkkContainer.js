import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsBkk } from '../redux'

import queryString from 'query-string';

import { clickMEJobsDb } from '../redux'
import { ClickeMeComponent } from './common/ClickeMeComponent'

import Pagination from "react-js-pagination";

function ThJobsBkkContainer (props) {
	
	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));	
	
  useEffect(() => {
    props.fetchThJobsBkk(obj)
  }, [])
  
	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchThJobsBkk(obj)
	  
	}   
  
  return props.thJobsBkkData.loading ? (
	  <main role="main" className="container">
		<p>Loading</p>
	  </main>
  ) : props.thJobsBkkData.error ? (
    <main role="main" className="container">
		<p>{props.thJobsBkkData.error}</p>
	  </main>
  ) : (
  
<main role="main" className="container">
	
	<b>Total  </b>: { props.thJobsBkkData.data.count }
	
	<div className="table-responsive">
	<table className="table">
	  <thead>
		<tr>
		  <th>No</th>
		  <th colSpan="2">Title</th>		  
		</tr>
	  </thead>
	  <tbody>  
	  
		<ClickeMeComponent 
			data={props.thJobsBkkData.thjobsbkk} 
			currentPage={props.thJobsBkkData.data.number} 
			addItemHandler={props.clickMeJobsDb} />
	   
	 </tbody>   
	</table>
	</div>  
	
	<div className="justify-content-center">
	
	<Pagination			  
			  itemsCountPerPage={100}
			  totalItemsCount={props.thJobsBkkData.data.count}
			  onChange={(pageNumber) => onChangeHandle(pageNumber)}
			  activePage={props.thJobsBkkData.data.number}
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
    thJobsBkkData: state.thjobsbkk,
	
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsBkk: (pageNumber) => dispatch(fetchThJobsBkk(pageNumber)),
	clickMeJobsDb: result => dispatch(clickMEJobsDb(result)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThJobsBkkContainer)
