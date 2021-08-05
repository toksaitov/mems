import { Link } from 'react-router-dom'

function Header({ user, handleLogin }) {
    const onSubmit = async event => {
        event.preventDefault()

        try {
            const response = await fetch('/session', { method: 'DELETE' })
            if (response.status === 204) {
                handleLogin(null)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <header>
            <Link to="/">mems</Link>
            {!user ?
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
                :
                <form onSubmit={onSubmit}>
                    <input type="submit" value={`Logout @${user.login}`} />
                </form>
            }
        </header>
    )
}

export default Header
