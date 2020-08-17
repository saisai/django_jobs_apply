import React, { Component } from 'react';

import { connect } from 'react-redux'

import { resetPasswordConfirmAction } from '../redux' 


class ResetPasswordConfirmContainer extends Component {
	
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        
		this.state = {"password": ""}
      }
	  
	  handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ ...this.state, [name]: value });
	  };	  

      componentDidMount(){
        const { match: { params } } = this.props;
		

		console.log('test', params)
		

        
      }
	  
	  
	handleChangePassword = (event) => {
		const { match: { params } } = this.props;
	event.preventDefault();
    const { password } = this.state;
	
    this.props.resetPasswordConfirmAction({'token':params.token, 'password': password});
			
		
	}     
    
  render() {
	return(
	
		
		<main role="main">
		

		<div class="container">
		{ this.props.resetpasswordconfirmData.loading ? 'loading...' : '' }
		<h4>Change your password</h4>
		<p>Enter your your new password.</p>
		


		<form method="post" role="form" onSubmit={this.handleChangePassword}>
		
		  <div className="form-group"><label for="id_username">New password</label>
		 <input
		 className="form-control" placeholder="Password"
		name="password"
		type="password"
		value={this.state.password}
		onChange={this.handleChange}
		/>
		  </div>
		
		  <button type="submit" className="btn btn-success">Change password</button>
		</form>
		
		<br />
		{ this.props.resetpasswordconfirmData.error ? <div className="alert alert-danger">
			Opps something weng wrong check it out!<br />
			Try to resend forgot password again?
		</div>
		  : "" }
		  
		  { this.props.resetpasswordconfirmData.isLoggedIn ?   ( window.location.href= "/login")
		  : ("")  }			
		
		  
		 
		  
		  </div>
		</main>		
	)
  }  
}
const mapStateToProps = state => {
  return {
    resetpasswordconfirmData: state.resetpasswordconfirm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPasswordConfirmAction: (params) => dispatch(resetPasswordConfirmAction(params)),   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordConfirmContainer)
