import React, { Component } from 'react';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import Login from './components/Login'
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/"><Login/></Route>
                        <Route exact path="/registration"><Registration/></Route>
                        <Route exact path="/dashboard"><Dashboard/></Route>

                        <Route path="/error" render={() => <h1>Not found</h1>}/>
                        <Redirect to="/error"/>
                    </Switch>
                </BrowserRouter>
            </div>
    );
    }
}

export default App;
