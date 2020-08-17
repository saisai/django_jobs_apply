import React, { useState, useEffect } from 'react'
import axios from 'axios'

function TestContainer () {
	
	const [data, setData] = useState([])
	
	useEffect(() => {
		
		axios.get('/api/thjobsdb/')
		.then(response => {
			setData(response.data.jobsdb)
			//setData({data:response.data})
		})
		.catch(error => {
			console.log(error.message)
		})
		
	},
	[])
	
	return(
		<>
		<div>{ /* JSON.stringify(data.jobsdb) */ }</div>
		
		<div>
		
		<ul>
		{
			
			data.map( c =>
				<li key={c.pk}>{c.title}</li>
			)
			
		}
		</ul>
		
		</div>
		</>
	)
		
}



export default TestContainer