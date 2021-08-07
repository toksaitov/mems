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

    handleMessageChange = event => {
        const target = event.target
        const id     = parseInt(target.name)

        this.setState({
            messages: this.state.messages.map(message => {
                return message.id !== id ? message : { ...message, content: target.value }
            })
        })
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

    handleEditSaveSubmit = async (event, id) => {
        event.preventDefault()

        const message = this.state.messages.find(message => message.id === id)
        if (!message.isBeingEdited) {
            this.setState({
                messages: this.state.messages.map(message => {
                    return message.id !== id ? message : { ...message, isBeingEdited: true, prevContent: message.content }
                })
            })
        } else {
            try {
                
                const response = await fetch(`/messages/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: message.content
                    })
                })
                if (response.status === 200) {
                    this.setState({
                        messages: this.state.messages.map(message => {
                            return message.id !== id ? message : { ...message, isBeingEdited: false }
                        })
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    handleDeleteCancelSubmit = async (event, id) => {
        event.preventDefault()

        const message = this.state.messages.find(message => message.id === id)
        if (!message.isBeingEdited) {
            try {
                const response = await fetch(`/messages/${id}`, { method: 'DELETE' })
                if (response.status === 204) {
                    this.setState({
                        messages: this.state.messages.filter(message => {
                            return message.id !== id
                        })
                    })
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            this.setState({
                messages: this.state.messages.map(message => {
                    return message.id !== id ? message : { ...message, isBeingEdited: false, content: message.prevContent }
                })
            })
        }
    }

    render() {
        const user = this.props.user
        return (
            <main className="container">
                {user &&
                    <div className="row justify-content-center">
                        <div className="col-6 px-5 mt-4">
                            <form onSubmit={this.handleMessageSubmit}>
                                <label htmlFor="message" className="text-secondary font-weight-bold">What’s on your mind?</label>
                                <div className="input-group mb-3">
                                    <input type="text" name="content" id="message" onChange={this.handleChange} value={this.state.content} className="form-control text-white border-secondary bg-secondary" />
                                    <div className="input-group-append">
                                        <input type="submit" value="Buzz" className="btn btn-secondary text-white font-weight-bold" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                }
                <>
                {
                    this.state.messages.map(message => {
                        const showEditDelete = user && (user.admin || user.login === message.user.login)

                        return <div key={message.id} className="row justify-content-center">
                            <div className="card p-3 m-2 text-white bg-secondary w-25">
                                <h5 className="card-title text-white">{message.user.login}</h5>
                                {message.isBeingEdited ?
                                    <><input type="text" name={message.id} onChange={this.handleMessageChange} value={message.content} className="form-control text-white border-secondary bg-secondary" /><br /></>
                                    :
                                    <p className="text-white">{message.content}</p>
                                }
                                <small>
                                    <Moment className="card-subtitle text-white" format="l">{message.createdAt}</Moment>
                                </small>
                                {showEditDelete &&
                                    <div className="clearfix">
                                        <div className="float-right">
                                            <form className="d-inline" onSubmit={event => { this.handleEditSaveSubmit(event, message.id) }}>
                                                <input className="btn btn-sm btn-outline-light" type="submit" value={message.isBeingEdited ? 'Save' : 'Edit' } />
                                            </form>
                                            <form className="d-inline ml-1" onSubmit={event => { this.handleDeleteCancelSubmit(event, message.id) }}>
                                                <input className="btn btn-sm btn-outline-light" type="submit" value={message.isBeingEdited ? 'Cancel' : 'Delete' }  />
                                            </form>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    })
                }
                </>
            </main>
        )
    }
}

export default MainPage
