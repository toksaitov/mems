import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import MainPage from './pages/MainPage.js'
import LoginPage from './pages/LoginPage.js'
import RegisterPage from './pages/RegisterPage.js'

import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null
        }
    }

    handleLogin = user => {
        this.setState({ user })
    }

    render() {
        return (
            <Router>
                <ul>
                    <li><Link to="/">mems</Link></li>
                    {!this.state.user ?
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                        :
                        <li><em>@{this.state.user.login}</em></li>
                    }
                </ul>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage user={this.state.user} handleLogin={this.handleLogin} />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App
