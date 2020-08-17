import React, { Component } from 'react';

import { Redirect } from "react-router-dom";

import { connect } from 'react-redux'
import { createCvfile } from '../redux' 


import CVFileService from './CVFileService';
import PositionService from './PositionService';

const cvfileService = new CVFileService();
const positionService = new PositionService();



class CVFileCreateUpdateContainer extends Component {
	
    constructor(props) {
        super(props);
		this.state  = {
			position: [],			
			profilePic: null,
			value: '',
			hiddenValue: '',
		};		
		
		this.inpuElement = null;
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
		this.handleChange = this.handleChange.bind(this);	

      }

      componentDidMount(){
		 
		
        const { match: { params } } = this.props;
		
        if(params && params.pk)
        {
          cvfileService.getCustomer(params.pk).then((c)=>{
                  
            self.setState({
						value: c.position_id,
						hiddenValue: params.pk
						});        
          })
        }
		
		var  self  =  this;
		positionService.getJobsThai().then(function (result) {
		console.log(result);
		console.log(result.numpages);
		self.setState({ 
					position:  result.data, 
					});
		});		
		
      }
	  
	handleChange(e){
		this.setState({profilePic: e.target.files[0]});
	  }
  
 
	  
      //handleCreate(data){
		  
		 //this.props.createCvfile(data)
		  /*
       cvfileService.createCustomer( data ).then((result)=>{
        
		  
        }).catch(( error )=>{
			alert(error.response.data.error);
          //alert('There was an error! create Please re-check your form.');
        });
		  */
		 
		
     // }	  
	  
      handleSubmit(event) {
		  
		  
		  
		 const { match: { params } } = this.props;
        
		
       if(params && params.pk)
	   {
			let data = new FormData(); // creates a new FormData object
			
			data.append('position_id', event.target.elements.position.value);
			data.append('cvfile', this.state.profilePic); // add your file to form data		   
			data.append('pk', event.target.elements.hiddenValue.value); // add your file to form data		
			data.append('user_id', localStorage.getItem('id')); // add your file to form data		
			
			
		   //this.handleCreate(data);
		   this.props.createCvfile(data)
		   
		   
		   
		
	   } else {
	   
		let data = new FormData(); // creates a new FormData object
		
		data.append('position_id', event.target.elements.position.value);
		data.append('cvfile', this.state.profilePic); // add your file to form data
		data.append('user_id', localStorage.getItem('id')); // add your file to form data		
		//this.handleCreate(data);
		this.props.createCvfile(data)
		
		
		
	   }
		
		event.preventDefault();
		
      }
	  
	 handleChangeSelect(event) {
		 
		this.setState({value: event.target.value});
		
	  }	  
    
      render() {
		  
		  const { match: { params } } = this.props;
		  
        return (
		  
		  <main role="main" className="container">
			<div class="container">
        
		
		{ params && params.pk ?  
			<h4>Edit CV file</h4>	
		:
			<h4>Add CV file</h4>	
		}
			<hr />
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
			<input type="hidden" value={this.state.hiddenValue} name="hiddenValue" />
            <label>
              File:</label>
               <input className="form-control" 
				type="file" 
				name="file" 
				ref={(input) => { this.inpuElement = input; }}
				onChange={this.handleChange} />

            <label>
              Position:</label>
              <select className="form-control" name="position" value={this.state.value} onChange={this.handleChangeSelect} >
				<option value="0">-</option>
			   {this.state.position.map( (c)  =>
				<option value={c.pk}>{ c.title }</option>
				)}		  
			  </select>		  
              <br />
            <input className="btn btn-success" type="submit" value="Save" />
            </div>
          </form>
		  
		   
		  { this.props.cvfileData.error ? <> <br /><div className="alert alert-danger">{this.props.cvfileData.error}</div> </>
		  : "" }
		  
		  { this.props.cvfileData.isError ? <Redirect to='/list-cvfile' /> : "" }
		  
		  </div>
		   </main>	
        );
      }  
}

const mapStateToProps = state => {
  return {
    cvfileData: state.cvfile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCvfile: obj => dispatch(createCvfile(obj))
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CVFileCreateUpdateContainer);
