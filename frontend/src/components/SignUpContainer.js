import React from "react";
import { connect } from "react-redux";
import {signupAction} from '../redux';
import { Formik } from "formik";
//import * as EmailValidator from "email-validator";
import * as Yup from "yup";

import { Redirect } from 'react-router-dom';


import "./Error.css"


const SignUpContainer = (propss) => (

 

  <Formik
    initialValues={{ email: "", password1: "", password2: "" }}
    onSubmit={(values, { setSubmitting }) => {
		
	   
      setTimeout(() => {
        console.log("Logging in", values);
		propss.signupAction(values);
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
      password1: Yup.string()
        .required("No password provided."),
        //.min(8, "Password is too short - should be 8 chars minimum.")
        //.matches(/(?=.*[0-9])/, "Password must contain a number.")
      password2: Yup.string()
        .required("No password provided.")		
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
			<h4>Sign Up </h4>
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
            name="password1"
            type="password"
            placeholder="Enter your password"
            value={values.password1}
            onChange={handleChange}
            onBlur={handleBlur}
            
          />
		  <br />
          {errors.password1 && touched.password1 && (
            <div className="input-feedback">{errors.password1}</div>
          )}
		  </div>

		  <div className="form-group">
          <label htmlFor="email">Confirm password</label>
          <input
			className="form-control" 
            name="password2"
            type="password"
            placeholder="Enter your confirm password"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            
          />
		  <br />
          {errors.password2 && touched.password2 && (
            <div className="input-feedback">{errors.password2}</div>
          )}
		  </div>		  
          <button className="btn btn-success" type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
		
			
			{ propss.signupData.data.redirectPage ? <Redirect to="/email-confim" />  : "" }
			{ propss.signupData.data.isError ?
				<> <br /><div className="alert alert-danger">{ propss.signupData.data.error.error }</div> </>
				 :  ''
			}
			 
			 
			  
		
			  </div>
			</main>				
      );
    }}
  </Formik>
  
);

const mapStateToProps = state => {
  return {
    signupData: state.signup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupAction: obj => dispatch(signupAction(obj))
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
