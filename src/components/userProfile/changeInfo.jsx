import React, { Component, useState } from "react";
import "./changeInfo.css"
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";


const ChangeInfo = ({id, name}) => {

    const initialState = {email: '', password: '', address: ''}

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
  
  const {
    user: { _id, namee, email, address, balance, about, role }
  } = isAuthenticated();

  let rating = 0;
  


  /*
  fetch('http://localhost:3000/rating?total=true&chosenUserID=' + id)
  .then( resp => resp.json())
  .then((data)=> {
    console.log("Response,", data)
  })*/
  
    const formHandler = (event) => {
      console.log("Form submitted: ")
      // event.preventDefault()
      console.log("Form submitted: ", formInfo)
      setFormInfo(initialState)
    }

    
    return (
      <div className="changeAddress-Page">

      
        <div className="changeAddress">
          <div className="card-header">
            Change Personal Information
          </div>
          <div className="card-body">
            <h5>Hello {name},</h5>
          <form classname="addressform" onSubmit={formHandler}>
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
                <Link to="/profile">
                  <button type="submit" className="btn btn-primary submit-btn">
                          Submit
                  </button>
                </Link>
            </form>
          </div>
        </div>
      </div>
    )
  
}


export default ChangeInfo