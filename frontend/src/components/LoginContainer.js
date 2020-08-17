import React from "react";
import { connect } from "react-redux";
import { loginAction } from '../redux' 
import { Formik } from "formik";
//import * as EmailValidator from "email-validator";
import * as Yup from "yup";


import "./Error.css"


const LoginContainer = (propss) => (

 

  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
		
	   
      setTimeout(() => {
        console.log("Logging in", values);
		propss.loginAction(values);
        setSubmitting(false);
      }, 500);
	  
    }}
    //********Handling validation messages yourself*******/
    // validate={values => {
    //   let errors = {};
    //   if (!values.email) {
    //     errors.email = "Required";
    //   } else if (!EmailValidator.validate(values.email)) {
    //     errors.email = "Invalid email address";
    //   }

    //   const passwordRegex = /(?=.*[0-9])/;
    //   if (!values.password) {
    //     errors.password = "Required";
    //   } else if (values.password.length < 8) {
    //     errors.password = "Password must be 8 characters long.";
    //   } else if (!passwordRegex.test(values.password)) {
    //     errors.password = "Invalida password. Must contain one number";
    //   }

    //   return errors;
    // }}
    //********Using Yum for validation********/

    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        //.min(8, "Password is too short - should be 8 chars minimum.")
        //.matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
			<main role="main">

			<div className="container">	  
			<h4>Log in with you email account</h4>
        <form onSubmit={handleSubmit} role="form">
		<div className="form-group">
          <label htmlFor="email">Email</label>
          <input
		   className="form-control" 
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}            
          />
		  <br />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}
		  </div>
		  <div className="form-group">
          <label htmlFor="email">Password</label>
          <input
			className="form-control" 
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            
          />
		  <br />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
		  </div>
          <button className="btn btn-success" type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
		
			{ propss.loginData.error ? <> <br /><div className="alert alert-danger">Opps something weng wrong check it out!</div> </>
		  : "" }
		  
		  { propss.loginData.isLoggedIn ?   ( window.location.href= "/")
		  : ("")  }
			  
			  <br />
			 <a href="/reset_password">Forgot your password?</a>	
		
			  </div>
			</main>				
      );
    }}
  </Formik>
  
);

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
