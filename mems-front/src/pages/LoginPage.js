import React from 'react'

import {
    Redirect
} from "react-router-dom"

class LoginPage extends React.Component {
    #isMounted = false

    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: ''
        }
    }

    componentDidMount() {
        this.#isMounted = true
    }

    componentWillUnmount() {
        this.#isMounted = false
    }

    handleChange = event => {
        const target = event.target
        const name   = target.name
        const value  = target.value
        this.setState({ [name]: value })
    }

    handleSubmit = async event => {
        event.preventDefault()

        try {
            const response = await fetch('/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: this.state.login,
                    password: this.state.password
                })
            })

            const data = await response.json()
            if (data.user) {
                this.props.handleLogin(data.user)
            }

            if (this.#isMounted) {
                this.setState({
                    login: '',
                    password: ''
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            this.props.user ?
                <Redirect to="/" />
                :
                <main>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="login">Login</label><br />
                        <input type="text" id="login" name="login" onChange={this.handleChange} value={this.state.login} /><br />
                        <label htmlFor="password">Password</label><br />
                        <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} /><br />
                        <input type="submit" value="Login" />
                    </form>
                </main>
        )
    }
}

export default LoginPage
