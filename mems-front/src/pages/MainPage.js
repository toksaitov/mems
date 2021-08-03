import React from 'react'

class MainPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
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

    render() {
        return (
            <main>{
                this.state.messages.map(message => {
                    return <div key={message.id}>
                        <p><strong>{message.user.login}</strong></p>
                        <p>{message.content}</p>
                    </div>
                })
            }</main>
        )
    }
}

export default MainPage
