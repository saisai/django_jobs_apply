import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsMonster } from '../redux'


import queryString from 'query-string';


import { clickMEJobsDb } from '../redux'
import { ClickeMeComponent } from './common/ClickeMeComponent'
import Pagination from "react-js-pagination";

function ThJobsMonsterContainer (props) {
	
	const [query] = useState(queryString.parse(props.location.search));
	const [obj] = useState(Object.assign({'page': 1}, {'q': query.q === undefined ? "" : query.q}));	
	
  useEffect(() => {
    props.fetchThJobsMonster(obj)
  }, [])
  
	const onChangeHandle = (pageNumber) => {
	  
	  console.log('hello', pageNumber);
	  let obj = Object.assign({'page': pageNumber}, {'q': query.q === undefined ? "" : query.q})
	  props.fetchThJobsMonster(obj)
	  
	}   
  
  return props.thJobsMonsterDate.loading ? (

	  <main role="main" className="container">
		<p>Loading</p>
	  </main>

  ) : props.thJobsMonsterDate.error ? (
     <main role="main" className="container">
		<p>{props.thJobsMonsterDate.error}</p>
	  </main>
  ) : (
  
<main role="main" className="container">
	
	<b>Total  </b>: { props.thJobsMonsterDate.data.count }
	
	<div className="table-responsive">
	<table className="table">
	  <thead>
		<tr>
		  <th>No</th>
		  <th colSpan="3">Title</th>
		</tr>
	  </thead>
	  <tbody>  
		<ClickeMeComponent data={props.thJobsMonsterDate.thjobsmonster} currentPage={props.thJobsMonsterDate.data.number} addItemHandler={props.clickMeJobsDb} />
	   
	 </tbody>   
	</table>
	</div>  
	<div className="justify-content-center">
	
	<Pagination			  
			  itemsCountPerPage={100}
			  totalItemsCount={props.thJobsMonsterDate.data.count}
			  onChange={(pageNumber) => onChangeHandle(pageNumber)}
			  activePage={props.thJobsMonsterDate.data.number}
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
    thJobsMonsterDate: state.thjobsmonster,
	
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsMonster: (pageNumber) => dispatch(fetchThJobsMonster(pageNumber)),
	clickMeJobsDb: result => dispatch(clickMEJobsDb(result))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThJobsMonsterContainer)
