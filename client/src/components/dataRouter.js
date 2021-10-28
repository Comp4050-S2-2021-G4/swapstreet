import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import UserProfile from "./userProfile/userProfile";
import Header from "./HeadingBar";
import ChangeInfo from "./userProfile/changeInfo";
import HomePage from "./homePage/homePage"
import Dashboard from "./dashboard/dashboard"
import JobPage from "./jobPage/jobPage"
import JobDataFill from "./dataFill/dataFillPage"
import Register from '../user/Register';
import Login from '../user/Login';
import ChatRoom from '../chat/ChatRoom'
import PrivateRoute from '../auth/PrivateRoute'
import { isAuthenticated } from "../auth/index";
import { API, secret } from '../config';
//import firebase from 'firebase/compat/app';


class dataRouter extends Component {

    constructor(props) {
        super(props);

        // firebase.initializeApp({
        //     apiKey: "AIzaSyCrUzYngucE_U5nqCggULTAlhJS2f6tVks",
        //     authDomain: "chat-app-demo-0-4050.firebaseapp.com",
        //     databaseURL: "https://chat-app-demo-0-4050-default-rtdb.firebaseio.com",
        //     projectId: "chat-app-demo-0-4050",
        //     storageBucket: "chat-app-demo-0-4050.appspot.com",
        //     messagingSenderId: "357664149852",
        //     appId: "1:357664149852:web:c17b5f10bbba9af1477199"
        // })

        if (isAuthenticated()) {
            const {
                user: { _id, name, email, address, balance, about, role }
            } = isAuthenticated();
            this.state = {
                location: null,
                userID: _id,
                name: name,
                email: email,
                balance: balance,
                jobs: []
            };
        } else {
            this.state = {
                location: null,
                userID: null,
                name: null,
                email: null,
                balance: null,
                jobs: []
            };
        }
    }

    componentDidMount() {
        this.updateJobs()
    }
  //`${API}/getJobs${secret}`
    updateJobs() {
        fetch('http://localhost:3200/jobs')
            .then(resp => resp.json())
            .then((data) => {
                console.log('updateJobs:', data);
                this.setState({
                    jobs: data
                })
            })
    }


    handleSelect(e) {
        console.log(e);
        this.setState({ location: e })
    }

    /* */

    render() {
        return (
            
            <BrowserRouter>
                <Header userID={this.state.userID} name={this.state.name} balance={this.state.balance} />
                <div className="app">
                    <Switch>
                        <Route path="/changeinfo">
                            <ChangeInfo id={this.state.userID} name={this.state.name}/>
                        </Route>

                        <Route path="/datafill">
                            <JobDataFill />
                        </Route>

                        <Route path='/login' exact component={Login} />
                        <Route path='/register' exact component={Register} />
                        <PrivateRoute component={UserProfile} path="/profile" exact />


                        <Route exact path="/add" render={(props) => <JobDataFill {...props} userID={this.state.userID} />} />

                        <Route exact path="/edit" render={(props) => <JobDataFill {...props} userID={this.state.userID} />} />

                        <PrivateRoute component={Dashboard} path="/dashboard" jobs={this.state.jobs} userID={this.state.userID} exact />


                        <Route exact path="/job" render={(props) => <JobPage {...props} userID={this.state.userID} />} />
                        <Route exact path="/messages" render={(props) => <ChatRoom />} />

                        <Route path="/">
                            <HomePage jobs={this.state.jobs} userID={this.state.userID} />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default dataRouter;
