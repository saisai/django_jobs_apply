import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchThJobsDb, clickMEJobsDb } from '../redux'

import axios from 'axios'

import { ClickeMeComponent } from './common/ClickeMeComponent'
import Pagination from "react-js-pagination";

class ThJobsDbContainer extends Component {
	
	state = { 
			users: [],
			count: '',
			totalPages: '',
			number: '',
			}
	
	async componentWillMount() {
		await this.getUsersData();
	}
	
	async getUsersData(pageNumber=1)
	{
		const url = `http://192.168.0.150:8000/api/thjobsdb/?page=${pageNumber}`
		const response = await axios.get(url)
		console.log(response)
		this.setState({
				users:response.data.jobsdb,
				count:response.data.count,
				totalPages:response.data.numpages,
				number:response.data.number,
				})
	}
	
	renderUsersList()
	{
		
	
		const jobsdb = this.state.users;
		const PER_PAGE = 100
		
			
		
					
		return (
			<>
			<ul>
			{ jobsdb.map( c => <li>{c.pk}{c.title}</li>)}
			</ul>
			 <div>
			 <Pagination
			  
			  activePage={this.state.number}
			  itemsCountPerPage={PER_PAGE}
			  totalItemsCount={this.state.count}
			  onChange={(pageNumber) => this.getUsersData(pageNumber)}
			/>
			 </div>
			 </>

		)
				
			
		
	}
	
	render()
	{
		
		return(
			<div>
			
			{ this.renderUsersList() }
			
			</div>
		)
	}
	
}


const mapStateToProps = state => {
  return {
    thJobsDbData: state.thjobsdb    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThJobsDb: () => dispatch(fetchThJobsDb()),
    clickMeJobsDb: result => dispatch(clickMEJobsDb(result)),
  }
}

export default connect(
  null,
  null
)(ThJobsDbContainer)
