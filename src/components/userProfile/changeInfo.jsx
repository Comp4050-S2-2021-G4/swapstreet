import React, { Component, useState } from "react";
import "./changeInfo.css"
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import { update} from "../../auth/index"


const ChangeInfo = ({id, name}) => {

  console.log("ID = ", {id});
  console.log("Session Storage ", sessionStorage.getItem('Name'));
  // const newName = sessionStorage.getItem('name');

    const initialState = {
      newName: sessionStorage.getItem('Name'),
      email: '', 
      password: '', 
      address: '', 
      jobs: '',
      rating: sessionStorage.getItem('Rating'),
      role: sessionStorage.getItem('Role'),
      balance: sessionStorage.getItem('Balance'),
      error: '',
      success: true
    }

    const [formInfo, setFormInfo] = useState(initialState)

    const updateField = (event) => {
      // which input element is this
      const name = event.target.attributes.name.value
      console.log(name, event.target.value)
      if (name === "email") {
          setFormInfo({...formInfo, email: event.target.value})
      } else if (name === "password") {
        setFormInfo({...formInfo, password: event.target.value})
      } else if (name === "address") {
        setFormInfo({...formInfo, address: event.target.value})
      }
      
  }
  
  const { newName, email, address, password, jobs, rating, role, balance, success, error } = formInfo;

    const formHandler = (event) => {
      console.log("Form submitted: ")
      // event.preventDefault()
      console.log("Form submitted: ", formInfo)
      setFormInfo(initialState)
    }

    const clickSubmit = event => {
      // prevent browser from reloading
      console.log("Form submitted: ", formInfo)
      event.preventDefault();
      setFormInfo({ ...formInfo, error: false });
      update({newName, email, password, address, jobs, rating, role, balance})
      .then(data => {
          if(data.error) {
            setFormInfo({...formInfo, error: data.error, success: true})
          } else {
            setFormInfo({
                  ...formInfo,
                  email: '',
                  password: '',
                  address:'',
                  jobs: '',
                  rating: '',
                  role: '',
                  balance: '',
                  error: '',
                  success: true
              })
          }
      })
  };


    return (
      <div className="changeAddress-Page">

      
        <div className="changeAddress">
          <div className="card-header">
            Change Personal Information
          </div>
          <div className="card-body">
            <h5>Hello {name},</h5>
          <form classname="addressform" onSubmit={clickSubmit}>
            <div className="form-group">
              <label htmlFor="email" >New Email address</label>
              <input type="email" className="form-control" name="email" onChange={updateField} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input type="password" className="form-control" name="password" onChange={updateField} id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="form-group">
              <label htmlFor="address">New Address</label>
              <input type="text" className="form-control" name="address" onChange={updateField} />
            </div>
                  <button type="submit" className="btn btn-primary submit-btn">
                          Submit
                  </button>
            </form>
          </div>
        </div>
      </div>
    )
  
}

// <Link to="/profile">

export default ChangeInfo