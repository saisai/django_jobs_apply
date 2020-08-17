import React from "react";


import { Provider } from 'react-redux'

import store from './redux/store'
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars

import './sticky-footer-navbar.css';
import HeaderHtml from "./components/HeaderHtml";
import FooterHtml from "./components/FooterHtml";




function App() {
  return (
	<Provider store={store}>
    <div>
      <HeaderHtml />
	  <FooterHtml />
	  
      
    </div>
	</Provider>
  );
}


export default App;
