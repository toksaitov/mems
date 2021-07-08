import bcrypt from 'bcryptjs'

function users(app, userModel) {
    app.post('/login', async (req, res) => {
        const login = req.body.login.trim()
        if (!login) {
            return app.handleError(res, 401, "Login can't be empty")
        }

        const password = req.body.password.trim()
        if (!password) {
            return app.handleError(res, 401, "Password can't be empty")
        }

        try {
            const user = await userModel.findOne({ 'where': { login }})
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return app.handleError(res, 401, "Login or password is incorrect")
            }

            req.session.user = user

            res.json({
                user: {
                    login: user.login,
                    admin: user.admin
                }
            })
        } catch(error) {
            console.error(error)
            return res.status(503).end()
        }
    })

    app.post('/logout', (req, res) => {
        if (!req.session.user) {
            return app.handleError(res, 401, "Not an authorized user")
        }

        req.session.regenerate(() => {
            res.json({
                user: null
            })
        })
    })
}

export default users
