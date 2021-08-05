import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './components/Header.js'

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

    async componentDidMount() {
        try {
            const response = await fetch('/session')
            const data = await response.json()
            if (data.user) {
                this.setState({
                    user: data.user
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    handleLogin = user => {
        this.setState({ user })
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Header user={this.state.user} handleLogin={this.handleLogin} />
                        <MainPage user={this.state.user} />
                    </Route>
                    <Route path="/login">
                        <LoginPage user={this.state.user} handleLogin={this.handleLogin} />
                    </Route>
                    <Route path="/register">
                        <RegisterPage user={this.state.user} handleLogin={this.handleLogin} />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App
