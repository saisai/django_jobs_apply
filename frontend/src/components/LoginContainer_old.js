import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction } from '../redux' 


const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const LoginContainer = (props) => {
	
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({email:"", password:""})
   const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const  handleValidation = () => {
        
        let formIsValid = true;
		//let errors = {};
        //Name
        if(!state["email"]){
           formIsValid = false;
			//const newError = { email: "Email can not be blank!" };
			//setErrors(newError); // Now it works    
			 setErrors(prevState => {
				return { ...prevState, email: "Email must not be blank!" }
			  });			
        }		
		if(regExp.test(state["email"]) !== true)
		{
          formIsValid = false;
			//const newError = { email: "Email can not be blank!" };
			//setErrors(newError); // Now it works    
			 setErrors(prevState => {
				return { ...prevState, email: "Email address is invalid" }
			  });				
		}
		
        if(!state["password"]){
           formIsValid = false;
			//const newError = { password: "Password can not be blank!" };
			//setErrors(newError); // Now it works   
			setErrors(prevState => {
				return { ...prevState, password: "Password must not be blank!" }
			  });					
        }		
 
       
       return formIsValid;
   }	
   
  const login = (event) => {
    event.preventDefault();
    const { email, password } = state;	
	console.log(handleValidation());
	if(handleValidation())
	{
	const newError = { email: "", password: "" };
	setErrors(newError); // Now it works    		
	props.loginAction({'email':email, 'password': password});
	}
   
  };

  return (				 
			<main role="main">

			<div class="container">
		  
			<h4>Log in with you email account</h4>

			<form method="post" role="form" onSubmit={login} >
			
			  <div className="form-group"><label for="id_username">Email address</label>
			  	<input
				className="form-control" 
				placeholder="Email address"
				name="email"
				type="text"
				value={state.email}
				onChange={handleChange}
			  />
			  <span style={{color: "red"}}>{errors.email}</span>
			  
			  </div>
			<div className="form-group"><label for="id_password">Password</label>
			
			 <input
			 className="form-control" placeholder="Password"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
			/>
			<span style={{color: "red"}}>{errors.password}</span>
			  </div>
			  <button type="submit" className="btn btn-success">Login</button>
			</form>
			
			{ props.loginData.error ? <div className="alert alert-danger">Opps something weng wrong check it out!</div>
		  : "" }
		  
		  { props.loginData.isLoggedIn ?   ( window.location.href= "/")
		  : ("")  }
			  
			  <br />
			 <a href="/reset_password">Forgot your password?</a>
			  
			  </div>
			</main>		
    
  );
};

const mapStateToProps = state => {
  return {
    loginData: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: obj => dispatch(loginAction(obj))
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);