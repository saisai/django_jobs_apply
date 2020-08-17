import React, { Component } from "react";
import {
  BrowserRouter as Router,
  } from "react-router-dom";


import ThJobsDbContainer from "./ThJobsDbContainer";
import ThJobsThaiContainer from "./ThJobsThaiContainer";
import ThJobsBkkContainer from "./ThJobsBkkContainer";
import ThJobsTopgunContainer from "./ThJobsTopgunContainer";
import ThJobsMonsterContainer from "./ThJobsMonsterContainer";
import ThJobsThaiJobcomContainer from "./ThJobsThaiJobcomContainer";
import ThJobsJobYesContainer from "./ThJobsJobYesContainer";
import ThJobsJobThaiWebContainer from "./ThJobsJobThaiWebContainer";
import SelectedContainer from "./SelectedContainer";
import PositionContainer from "./PositionContainer";
import PositionCreateUpdateContainer from "./PositionCreateUpdateContainer";
import CvfileContainer from "./CvfileContainer";
import CVFileCreateUpdateContainer from "./CVFileCreateUpdateContainer";
//import CVFileCreateUpdate from "./CVFileCreateUpdate";
import AddDetailHtml from "./AddDetailHtml";
import ViewDetailHtml from "./ViewDetailHtml";
import LoginContainer from "./LoginContainer";
import SignUpContainer from "./SignUpContainer";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ActivateEmailContainer from "./ActivateEmailContainer";
import ResetPasswordContainer from "./ResetPasswordContainer";
import ResetPasswordConfirmContainer from "./ResetPasswordConfirmContainer";
import EmailConfirmationContainer from "./EmailConfirmationContainer";
import TestContainer from "./TestContainer";


const Logout = logout => {
        localStorage.clear();
        window.location.href = '/';
    }

const TestLogin = () => {
		
		return localStorage.getItem("token") ? (
				<>
            <li className="nav-item">
              <a className="nav-link" href="/selected">Selected</a>
            </li>					
				<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Position</a>
				<div className="dropdown-menu" aria-labelledby="dropdown01">
				  <a className="dropdown-item" href="/add-position">Add position</a>
				  <a className="dropdown-item" href="/list-position">List position</a>
				  
				</div>
			</li>			
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CV File</a>
				<div className="dropdown-menu" aria-labelledby="dropdown01">
				  <a className="dropdown-item" href="/add-cvfile">Add CV File</a>
				  <a className="dropdown-item" href="/list-cvfile">List CV File</a>				  
				</div>
			 </li>	
            <li className="nav-item">
               <a className="nav-link" href="/logout">Logout</a>			  
            </li>				 
			 </>
			 ) : (
			<>
			 <li className="nav-item">
			 <a className="nav-link" href="/login">Login</a>
             </li>
			
			<li className="nav-item">
				 <a className="nav-link" href="/signup">Signup</a>
             
            </li>			
			</>
			)
	
}

const BaseLayout = () => (
	<div>
    <header>      
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
           <ul className="navbar-nav mr-auto">
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="/" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Th</a>
				<div className="dropdown-menu" aria-labelledby="dropdown01">
				  <a className="dropdown-item" href="/">Jobs DB</a>
				  <a className="dropdown-item" href="/jobsthai">Jobs Thai</a>
				  <a className="dropdown-item" href="jobsbkk">Jobs BKK</a>
				  <a className="dropdown-item" href="/thjobs-topgun">Jobs TOP GUN</a>
				  <a className="dropdown-item" href="/th-monster">Monster</a>
				  <a className="dropdown-item" href="/thai-jobcom">Thaijobcom</a>
				  <a className="dropdown-item" href="/jobyes">Jobyes</a>
				  <a className="dropdown-item" href="/thjobthaiweb">Jobthaiweb</a>
				</div>
			  </li>		   

			<TestLogin /> 			
            
          </ul>
           <form className="form-inline mt-2 mt-md-0">
            <input className="form-control mr-sm-2" name="q" type="text" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </header>	
	<div style={{ height: '70px' }}></div>
	<div >
	
	
      <PublicRoute restricted={false} path="/" exact component={ThJobsDbContainer} /> 	   
	  <PublicRoute restricted={false} path="/jobsthai" exact component={ThJobsThaiContainer} />  
	  <PublicRoute restricted={false} path="/jobsbkk" exact component={ThJobsBkkContainer} />  
	  <PublicRoute restricted={false} path="/thjobs-topgun" exact component={ThJobsTopgunContainer} />  
	  <PublicRoute restricted={false} path="/th-monster" exact component={ThJobsMonsterContainer} />  
	  <PublicRoute restricted={false} path="/thai-jobcom" exact component={ThJobsThaiJobcomContainer} />  
	  <PublicRoute restricted={false} path="/jobyes" exact component={ThJobsJobYesContainer} />  
	  <PublicRoute restricted={false} path="/thjobthaiweb" exact component={ThJobsJobThaiWebContainer} />  
	
	  <PrivateRoute  path="/selected" exact component={SelectedContainer} />  
	  <PrivateRoute path="/list-position" exact component={PositionContainer} />  
	  <PrivateRoute path="/add-position" exact component={PositionCreateUpdateContainer} />  
	  <PrivateRoute path="/edit-position/:pk" exact component={PositionCreateUpdateContainer} />
	  <PrivateRoute path="/list-cvfile" exact component={CvfileContainer} />
	  <PrivateRoute path="/add-cvfile" exact component={CVFileCreateUpdateContainer} />
	  <PrivateRoute path="/edit-cvfile/:pk" exact component={CVFileCreateUpdateContainer} />
	  <PrivateRoute path="/add_detail/:id" exact component={AddDetailHtml} />
	  <PrivateRoute path="/edit_detail/:id" exact component={AddDetailHtml} />
	  <PrivateRoute path="/view_detail/:id" exact component={ViewDetailHtml} />	
	
	  <PublicRoute path="/login" exact component={LoginContainer} />	  
	  <PublicRoute path="/logout" exact component={Logout} />	  
	  <PublicRoute path="/signup" exact component={SignUpContainer} />	  
	  <PublicRoute restricted={true} path="/activate/:uidb64/:token" exact component={ActivateEmailContainer} />	  
	  <PublicRoute restricted={false} path="/reset_password" exact component={ResetPasswordContainer} />	 
	  <PublicRoute restricted={true} path="/password_reset/confirm/:token" exact component={ResetPasswordConfirmContainer} />	 
	  <PublicRoute restricted={false} path="/email-confim" exact component={EmailConfirmationContainer} />	 
	  <PublicRoute restricted={false} path="/tester" exact component={TestContainer} />	 
	    		  
    </div>
	</div>	
	
)

class HeaderHtml extends Component {
  render() {
    return (
	
      <Router>
        <BaseLayout/>
      </Router>
	 
    );
  }
}

export default HeaderHtml;
