import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPosition,deletePosition } from '../redux' 

function PositionContainer (props) {
	
  useEffect(() => {
    props.fetchPosition()
  }, [])
  
  return props.positionData.loading ? (
									<main role="main" className="container">
											<p>Loading</p>
									</main>
  ) : props.positionData.error ? (
									<main role="main" className="container">
											<p>{props.positionData.error}</p>
									</main>	

  ) : (
  
<main role="main" className="container">
	
	<b>Total  </b>: { props.positionData.data.count }
	
	<div className="table-responsive">
	<table className="table">
	  <thead>
		<tr>
		  <th>No</th>
		  <th>Title</th>
		  <th colSpan="2"></th>
		</tr>
	  </thead>
	  <tbody>  
	   {props.positionData.position.map( (c, index)  =>  
			
			
			<tr  key={c.pk}>
			<td>{index + 1}  </td>
			<td>{c.title}</td>                
			<td><a href={"/edit-position/" + c.pk} className="btn btn-success">Edit</a></td>                
			<td><button className="btn btn-danger" onClick={() => props.deletePosition(c.pk)}>Delete</button></td>                
			          
			
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
    positionData: state.position
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosition: () => dispatch(fetchPosition()),
    deletePosition: id => dispatch(deletePosition(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PositionContainer)
