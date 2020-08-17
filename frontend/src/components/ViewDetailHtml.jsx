import  React, { Component } from  'react';

import SelectedService from './SelectedService'

import PositionService from './PositionService';
const positionService = new PositionService();

const selectedService = new SelectedService();

	
class  ViewDetailHtml  extends  Component {

	constructor(props) {
		super(props);
		this.state  = {
			data: [],
			position: [],			
			value: '',			
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

	componentDidMount() {
		
		const { match: { params } } = this.props;
		console.log(params.id);
		
		var  self  =  this;
		if(params && params.id)
		{
		selectedService.getCustomer(params.id).then(function (result) {
			console.log(result.title);
			console.log(result.numpages);
			
			
				
			   
			self.setState(
						{ 
						data:  result, 	
						value: result.position_id ? result.position_id : "" ,
						}
						)
		});
		

			positionService.getJobsThai().then(function (result) {
			console.log(result);
			console.log(result.numpages);
			self.setState(
						{ 
						position:  result.data, 
						}
						)
			});	
		}
		
	}

	 handleChange(event) {
		this.setState({value: event.target.value});
	  }

      handleUpdate(pk){
        selectedService.updateCustomer(
          {
            "pk": pk,
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value,
            "address": this.refs.address.value,
            "description": this.refs.description.value
        }          
        ).then((result)=>{
          console.log(result);
          alert("Customer updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
		
		
      }

     handleSubmit(event) {
        event.preventDefault();
		
		console.log(event.target.elements.email.value);
		console.log(event.target.elements.qualification.value);
		
		const { match: { params } } = this.props;

         selectedService.updateCustomer(
          {
            "pk": params.id,
            "link": this.state.data.link,
            "title": this.state.data.title,
            "email": event.target.elements.email.value,
            "companyinfo": event.target.elements.companyinfo.value,
            "qualification": event.target.elements.qualification.value,
            "responsibility": event.target.elements.responsibility.value,
            "salary": event.target.elements.salary.value,
            "position_id": parseInt(event.target.elements.position.value)
        }          
        ).then((result)=>{
          console.log(result);
           window.location = '/selected';
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });

        event.preventDefault();				
		
      }
	  
	render() {

		return (
		
				<main role="main" className="container">
				
				<b>Add Detail  </b>
				
				<div className="table-responsive">
				<form onSubmit={this.handleSubmit}>
				<table className="table">
				  <tr><td>Title</td><td><a rel="noopener noreferrer" target="_blank" href={this.state.data.link}>{ this.state.data.title }</a></td></tr>
				  <tr><td>Email</td><td>{ this.state.data.email }</td></tr>
				  <tr><td>Qualification</td><td>{ this.state.data.qualification }</td></tr>
				  <tr><td>Responsibility</td><td>{ this.state.data.responsibility }</td></tr>
				  <tr><td>Company Info	</td><td>{ this.state.data.companyinfo }</td></tr>
				  <tr><td>Position</td><td> { this.state.data.position_title } </td></tr>
				  <tr><td>Salary</td><td>{ this.state.data.salary }</td></tr>
				  <tr><td>&nbsp;</td><td><button className="btn btn-success">Add</button></td></tr>
				  
				</table>
				</form>
				</div>  		
				 </main>		
		
			);
	  }
}
export  default  ViewDetailHtml;	