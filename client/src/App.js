import React, { Component } from 'react';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import Login from './components/Login'
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";

import './App.css';

class App extends Component {
    state = {loggedIn: localStorage.getItem('auth') != null};

    handleLoggedIn = () => {
        localStorage.getItem('auth') ? this.setState({loggedIn: true}) : this.setState({loggedIn: false});
    };
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        { this.state.loggedIn
                        && <Route path="/"><Dashboard handleLoggedIn={this.handleLoggedIn.bind(this)}/></Route> }
                        <Route exact path="/"><Login handleLoggedIn={this.handleLoggedIn.bind(this)}/></Route>
                        <Route exact path="/registration"><Registration handleLoggedIn={this.handleLoggedIn.bind(this)}/></Route>
                        <Route path="/error" render={() => <h1>Not found</h1>}/>
                        <Redirect to="/error"/>
                    </Switch>
                </BrowserRouter>
            </div>
    );
    }
}

export default App;
