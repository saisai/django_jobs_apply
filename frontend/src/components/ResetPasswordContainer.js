import React from "react";
import { connect } from "react-redux";
import { resetPasswordAction } from '../redux' 
import { Formik } from "formik";
//import * as EmailValidator from "email-validator";
import * as Yup from "yup";


import "./Error.css"


const ResetPasswordContainer = (propss) => (

 

  <Formik
    initialValues={{ email: "" }}
    onSubmit={(values, { setSubmitting }) => {
		
	   
      setTimeout(() => {
        console.log("Logging in", values);
		propss.resetPasswordAction(values);
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
<h4>Forgot your password?</h4>
			<p>Enter your email address below, and we'll email instructions for setting a new one.</p>
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
		 
          <button className="btn btn-success" type="submit" disabled={isSubmitting}>
            Reset password
          </button>
        </form>
			
						
			{ propss.resetpasswordData.isError ? <> <br /><div className="alert alert-danger">{ propss.resetpasswordData.error.email }</div> </>
		  : 
			""
		  }
		  
			{ propss.resetpasswordData.isLoggedIn ? <> <br /><div className="alert alert-success">Successfully sent resetting password to your email!</div> </>
		  : 
			""
		  }		  
			
			
			  
			 
		
			  </div>
			</main>				
      );
    }}
  </Formik>
  
);

const mapStateToProps = state => {
  return {
    resetpasswordData: state.resetpassword
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPasswordAction: obj => dispatch(resetPasswordAction(obj))
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
