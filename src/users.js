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

    app.post('/register', async (req, res) => {
        const login = req.body.login.trim()
        if (!login) {
            return app.handleError(res, 400, "Login can't be empty")
        }

        let password = req.body.password.trim()
        if (!password) {
            return app.handleError(res, 400, "Password can't be empty")
        }

        const passwordRepeat = req.body.passwordRepeat.trim()
        if (!passwordRepeat) {
            return app.handleError(res, 400, "Repeated password can't be empty")
        }

        // TODO: check how strong the password is
        
        if (password !== passwordRepeat) {
            return app.handleError(res, 400, "The password was not repeated correctly")
        }

        try {
            let user = await userModel.findOne({ 'where': { login }})
            if (user) {
                return app.handleError(res, 400)
            }

            password = bcrypt.hashSync(password, 8)
            user = await userModel.create({ login, password })

            req.session.user = user

            res.json({
                user: {
                    login: user.login,
                    admin: false
                }
            })
        } catch(error) {
            console.error(error)
            return res.status(503).end()
        }
    })
}

export default users
