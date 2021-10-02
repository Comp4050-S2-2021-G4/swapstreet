
import React, { Component } from 'react';
import './userProfile.css';
// @ts-ignore
//import profilePic from '../../resources/userProfile/default-user.jpg'
import "./sideBar.css"
import './sideBarNav.css'
import "./userInfo.css"
import {  Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { isAuthenticated } from "../../auth/index";


const Profile = () => {
  const {
    user: { _id, name, email, address, coins, about, role}
  } = isAuthenticated();

  let rating = 0;
  
  fetch('http://localhost:3200/rating?total=true&chosenUserID=' + _id)
  .then( resp => resp.json())
  .then((data)=> {
     rating = data.total
  })

   sessionStorage.setItem('Name', name);
   sessionStorage.setItem('Email', email);
   sessionStorage.setItem('Address', address);
   sessionStorage.setItem('Balance', coins);
   sessionStorage.setItem('About', about);
   sessionStorage.setItem('Role', role);

  return (
      <div className="Profile-page">
        <div className="sidebar">
            <div className = "card">
            <div className = "card-userProfile">
            <div className = "d-flex flex-column align-items-center text-center">
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"/>
            <div className = "card-body">
            <h5 className="card-title">{name}</h5>
            </div>
            </div>
            </div>
            <div className="card-body">
                <div className="sidebarnav">
                    <Link to='/'>
                        <h2 className="titles">Search for Jobs</h2>
                    </Link>
                </div>
                <div className="sidebarnav">
                    <Link to='/changeinfo'>
                        <h2 className="titles">Change Personal Information</h2>
                    </Link>
                </div>
        
                <div className="sidebarnav">
                    <Link to='/dashboard'>
                        <h2 className="titles">Dashboard</h2>
                    </Link>
                </div>
            </div>
            </div>
        </div>

        <div className="userinfo">
            <div className="card-group">
                <div className="card">
                    <div className="card-header">
                        User Information
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p> Full Name : {name}</p>
                                    <p>Email Address : {email}</p>
                                    <p> Address : {address}</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="card-header">
                            User Swapstreet Information
                     </div>  
                     <div className="row">
                        <div className="col-sm-6">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p> Your Rating : {}</p>
                                    <p> Balance : {coins}</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="card-header">
                            About you
                     </div> 
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p> {}</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Profile;