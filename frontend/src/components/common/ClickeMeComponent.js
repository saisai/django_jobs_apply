import React from "react"


export const ClickeMeComponent = props => {
	
		
		
		return localStorage.getItem("token") ? (
		
			<>
			
				{ props.data.map( (c, index) => 
				<tr  key={c.pk}>
				
				
				<td>{ props.currentPage > 1 ? ( (index + 1) + ( ( props.currentPage -1) * 100 ) ) : (index + 1) }  </td>
				<td><a rel="noopener noreferrer" target="_blank" href={c.link}>{c.title}</a></td>                
				<td>{ c.time }</td>	
					<td>
				
				
				<input type="submit" value="Click Me" className="btn btn-success formJobsDb" onClick={() => props.addItemHandler({'id': localStorage.getItem("id"), 'title':c.title, 'link':c.link})} />
				
				
				
				</td>	
				</tr>
				)}
			</>
		
		
		) : (
			
			<>
				{ props.data.map( (c, index) => 
				<tr  key={c.pk}>
				
				
				<td>{ props.currentPage > 1 ? ( (index + 1) + ( props.currentPage * 100 ) ) : (index + 1) }  </td>
				<td><a rel="noopener noreferrer" target="_blank" href={c.link}>{c.title}</a></td>                
				<td>{ c.time }</td>	
					
				</tr>
				)}		
			</>
		)
	
}