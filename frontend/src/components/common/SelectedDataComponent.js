import React from "react"

export const SelectedDataComponent = props => {
	
	
		return (
		
			<>
			{
				
				props.data.map( (c, index)  =>  
							
							
						<tr  key={c.id}>
							<td>{ props.currentPage > 1 ? ( (index + 1) + ( ( props.currentPage -1) * 100 ) ) : (index + 1) }  </td>
							
							<td><a rel="noopener noreferrer" target="_blank" href={c.link}>{c.title}</a></td>   
							
							
							
							{ c.email ? 
										<>
										<td><a rel="noopener noreferrer" href={"/edit_detail/" + c.id} className="btn btn-success">Edit</a></td>
										<td><a rel="noopener noreferrer" href={"/view_detail/" + c.id} className="btn btn-success">View</a></td>
										<td><button className="btn btn-info">{"Apply " + c.apply_times + " times"}</button></td>
										<td><button className="btn btn-danger" onClick={()=> props.deleteSelected(c.id) }>Delete</button></td>
										<td><button className="btn btn-success" onClick={() => props.sendEmail(c.id) }>Fire me</button></td>
										</>
										:
										<>
										<td><a rel="noopener noreferrer" href={"/add_detail/" + c.id} className="btn btn-success">Add detail</a></td>
										<td><button className="btn btn-danger" onClick={()=> props.deleteSelected(c.id) }>Delete</button></td>
										<td></td>
										<td></td>
										<td></td>
										</>
							 }					
							
						</tr>						
						
						)			
				
			}
			</>
		
		
		)
	
}