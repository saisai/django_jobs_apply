import React, { Component } from 'react';

import { connect } from 'react-redux'

import { activateAction } from '../redux' 


class ActivateEmailContainer extends Component {
 
      componentDidMount(){
        const { match: { params } } = this.props;
		
		console.log(params.uidb64)
		console.log(params.token)
		
		this.props.activateAction(params)
        
      }    
    
      render() {
		  
		 return this.props.activateData.loading ? (
				<h2>Loading</h2>
			  )
				: this.props.activateData.error ? (
			<h2>{ "Oops Something went wrong" }</h2>
		  ) :  (
		  
		  <main role="main" className="container">
		  <div style={{ height: '50px' }}></div>
			  <h2>Thank you for your email confirmation. Now you can login your account.</h2>
		   </main>	
        );
      }  
}


const mapStateToProps = state => {
  return {
    activateData: state.activate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activateAction: (params) => dispatch(activateAction(params)),   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivateEmailContainer)
