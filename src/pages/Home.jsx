import React from "react";
import Container from "react-bootstrap/Container";
import bghome from "../assets/scss/bghome.webp";
import "../App.scss"


const Home = () => {
	return (
		<div style={{ backgroundImage: `url(${bghome})`,
        objectFit: "cover",
        minHeight: "100vh"}}>
        
        <div className="d-flex justify-content-center align-items-center h-100">
        <div className="text-white">
          <h1 className="H1">Welcome</h1>
          <h5 className="H5">This a photo app</h5>
          </div>
      </div>    
    </div> 
	);
};

export default Home;
