import React from "react";
import "./Footer.css";

function Footer() {
  return (
      
    <footer className="footer space-enter">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
  	 <div className="container">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><a href="/">about us</a></li>
  	 				<li><a href="/">our services</a></li>
  	 				<li><a href="/">privacy policy</a></li>
  	 				<li><a href="/">affiliate program</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Get help</h4>
  	 			<ul>
  	 				<li><a href="/">FAQ</a></li>
  	 				<li><a href="/">Email</a></li>
  	 				<li><a href="/users/register">Register</a></li>
  	 				<li><a href="/users/login">Login</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Online</h4>
  	 			<ul>
  	 				<li><a href="/">Course</a></li>
  	 				<li><a href="/">Author</a></li>
  	 				<li><a href="/">Private</a></li>
  	 				<li><a href="/">Book</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>follow me</h4>
  	 			<div className="social-links">
  	 				<a href="https://www.facebook.com/kukuhpahlawannoviandra"><i className="fab fa-facebook-f"></i></a>
  	 				<a href="https://twitter.com/kukuhnoviandra"><i className="fab fa-twitter"></i></a>
  	 				<a href="https://www.instagram.com/kukuhsekawan/"><i className="fab fa-instagram"></i></a>
  	 			</div>
  	 		</div>
              
  	 	</div>
           <div className= "text-white text-center">
            <p>Copyright &#169; 2021 KukuhNoviandra</p>
        </div>
  	 </div>
       
  </footer>
  );
}

export default Footer;