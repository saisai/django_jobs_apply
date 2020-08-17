import React, { Component } from 'react';

import PositionService from './PositionService';

const positionService = new PositionService();

class PositionCreateUpdateContainer extends Component {
	
    constructor(props) {
        super(props);        
		
       this.state = {
           fields: {},
           errors: {}
       }
	   
        this.handleSubmit = this.handleSubmit.bind(this);
      }
	  
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["title"]){
           formIsValid = false;
           errors["title"] = "Cannot be empty";
        }

 
       this.setState({errors: errors});
       return formIsValid;
   }	  
   handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
		 
			
          positionService.getCustomer(params.pk).then((c)=>{
			  
				this.setState(prevState => {
				  let fields = Object.assign({}, prevState.fields);  // creating copy of state variable fields
				  fields.title = c.title;                     // update the name property, assign a new value                 
				  return { fields };                                 // return new object fields object
				})			  
			//this.setState( { fields["title"]:c.title } )  
            //this.state.fields["title"] = c.title;           
			
          })
		  
        }
      }

      handleCreate(){
        positionService.createCustomer(
          {
            "title": this.refs.title.value,
			"user_id" : localStorage.getItem('id')  // add your file to form data		      
            
        }          
        ).then((result)=>{
         
        }).catch(()=>{
          //alert('There was an error! create Please re-check your form.');
        });
      }
	  
      handleUpdate(pk){
        positionService.updateCustomer(
          {
            "pk": pk,
            "title": this.refs.title.value,  
			'user_id': localStorage.getItem("id")
           
        }          
        ).then((result)=>{
          console.log(result);
          alert("Position updated!");
		  window.location.href = '/list-position'
        }).catch(()=>{
          alert('There was an error! update Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;
		
       if(this.handleValidation()){
           //alert("Form submitted");
			if(params && params.pk){
			  this.handleUpdate(params.pk);
			}
			else
			{
				
			  this.handleCreate();
			   alert("Position added!");
			   window.location.href = '/list-position'
			  
			}		   
        }else{
           console.log("Form has errors.")
           //alert("Form has errors.")
        }		



        event.preventDefault();
      }
    
      render() {
       const { match: { params } } = this.props;
        
        return (
		  
		  <main role="main" className="container">
			<div class="container">
			{ params && params.pk ?
			<h4>Edit position</h4>
			:
			<h4>Add position</h4>		  
			}
		  <hr />
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Position:</label>
              <input className="form-control" 
				  type="text" ref='title'  
				  onChange={this.handleChange.bind(this, "title")} 
				  value={this.state.fields["title"]} />
			  <span style={{color: "red"}}>{this.state.errors["title"]}</span> <br />
            <br />  
            <input className="btn btn-success" type="submit" value="Save" />
            </div>
          </form>
		  </div>
		   </main>	
        );
      }  
}

export default PositionCreateUpdateContainer;