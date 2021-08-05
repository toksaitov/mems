import React from 'react'

import {
    Redirect
} from "react-router-dom"

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: '',
            passwordRepeat: ''
        }
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
            console.log(this.state.login)
            console.log(this.state.password)
            console.log(this.state.passwordRepeat)

            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: this.state.login,
                    password: this.state.password,
                    passwordRepeat: this.state.passwordRepeat
                })
            })

            const data = await response.json()
            if (data.user) {
                this.props.handleLogin(data.user)
            }

            this.setState({
                login: '',
                password: '',
                passwordRepeat: ''
            })
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
                    <form onSubmit={this.handleSubmit} autocomplete="off">
                        <label htmlFor="login">Login</label><br />
                        <input type="text" id="login" name="login" onChange={this.handleChange} value={this.state.login} autocomplete="off" /><br />
                        <label htmlFor="password">Password</label><br />
                        <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} autocomplete="new-password" /><br />
                        <label htmlFor="passwordRepeat">Repeat Password</label><br />
                        <input type="password" id="passwordRepeat" name="passwordRepeat" onChange={this.handleChange} value={this.state.passwordRepeat} autocomplete="new-password" /><br />
                        <input type="submit" value="Register" />
                    </form>
                </main>
        )
    }
}

export default RegisterPage
