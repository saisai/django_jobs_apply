import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCvfile, deleteCvfile } from '../redux' 

function CvfileContainer (props) {
	
  useEffect(() => {
    props.fetchCvfile()
  }, [])
  
  return props.cvfileData.loading ? (
									<main role="main" className="container">
											<p>Loading</p>
									</main>
  ) : props.cvfileData.error ? (
									<main role="main" className="container">
											<p>{props.cvfileData.error}</p>
									</main>	  

  ) : (
  
<main role="main" className="container">
	
	<b>Total  </b>: { props.cvfileData.data.count }
	
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
	   {props.cvfileData.cvfile.map( (c, index)  =>  
			
			
			<tr  key={c.pk}>
			<td>{index + 1}  </td>
			<td>{c.filename}</td>                
			<td><a href={"/edit-cvfile/" + c.pk} className="btn btn-success">Edit</a></td>                
			<td><button className="btn btn-danger" onClick={() => props.deleteCvfile(c.pk)}>Delete</button></td>                
			          
			
		</tr>
			
			
		
		)}
	 </tbody>   
	</table>
	</div>  
	

	 </main>	  

  )
}

const mapStateToProps = state => {
  return {
    cvfileData: state.cvfile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCvfile: () => dispatch(fetchCvfile()),
    deleteCvfile: id => dispatch(deleteCvfile(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CvfileContainer)
