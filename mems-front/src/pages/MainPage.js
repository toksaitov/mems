import React from 'react'
import Moment from 'react-moment'

class MainPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            messages: []
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('/messages')
            const data = await response.json()
            this.setState({
                messages: data
            })
        } catch (error) {
            console.error(error)
        }
    }

    handleChange = event => {
        const target = event.target
        const name   = target.name
        const value  = target.value
        this.setState({ [name]: value })
    }

    handleMessageSubmit = async event => {
        event.preventDefault()

        try {
            const response = await fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: this.state.content
                })
            })

            const data = await response.json()
            if (data.message) {
                this.setState({
                    content: '',
                    messages: [...this.state.messages, data.message]
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    handleDeleteSubmit = async (event, id) => {
        event.preventDefault()

        try {
            const response = await fetch(`/messages/${id}`, {
                method: 'DELETE'
            })

            this.setState({
                messages: this.state.messages.filter(message => {
                    return message.id !== id
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <>
                {this.props.user &&
                    <form onSubmit={this.handleMessageSubmit}>
                        <label htmlFor="message">What’s on your mind?</label><br />
                        <input type="text" name="content" id="message" onChange={this.handleChange} value={this.state.content} />
                        <input type="submit" value="Buzz" />
                    </form>
                }
                <main>{
                    this.state.messages.map(message => {
                        return <div key={message.id}>
                            <p><strong>{message.user.login}</strong></p>
                            <p>{message.content}</p>
                            <Moment format="l">{message.createdAt}</Moment>
                            <form onSubmit={event => { this.handleDeleteSubmit(event, message.id) }}>
                                <input type="submit" value="Delete" />
                            </form>
                        </div>
                    })
                }</main>
            </>
        )
    }
}

export default MainPage
