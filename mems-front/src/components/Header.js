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
            <nav className="navbar navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">
                    <h1>mems</h1>
                </Link>
                {!user ?
                    <div className="btn-group">
                        <Link className="btn btn-outline-light" to="/login">Login</Link>
                        <Link className="btn btn-outline-light" to="/register">Register</Link>
                    </div>
                    :
                    <form onSubmit={onSubmit}>
                        <input className="btn btn-outline-light" type="submit" value={`Logout @${user.login}`} />
                    </form>
                }
            </nav>
        </header>
    )
}

export default Header
