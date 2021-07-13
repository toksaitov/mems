function messages(app, messageModel, userModel) {
    app.get('/messages', async (_, res) => {
        try {
            const messages = await messageModel.findAll({ include: [ { model: userModel } ]})
            res.json(messages.map(message => {
                return {
                    id: message.id,
                    content: message.content,
                    createdAt: message.createdAt,
                    user: {
                        id: message.user.id,
                        login: message.user.login
                    }
                }
            }))
        } catch(error) {
            console.error(error)
            return res.status(503).end()
        }
    })

    app.post('/create-message', async (req, res) => {
        if (!req.session.user) {
            return app.handleError(res, 403, "Unauthorized users can't post messages")
        }

        const userId = req.session.user.id
        const content = req.body.content.trim()
        if (!content) {
            return app.handleError(res, 400, "Message can't be empty")
        }

        try {
            const message = await messageModel.create({ userId, content })

            res.json({
                message: {
                    id: message.id,
                    content: message.content,
                    createdAt: message.createdAt,
                    user: {
                        id: userId,
                        login: req.session.user.login
                    }
                }
            })
        } catch(error) {
            console.error(error)
            return res.status(503).end()
        }
    })

    app.post('/delete-message/:id', async (req, res) => {
        if (!req.session.user) {
            return app.handleError(res, 403, "Unauthorized users can't delete messages")
        }

        const id = req.params.id
        if (!id) {
            return app.handleError(res, 400, "ID of the message must be specified")
        }

        try {
            let affectedRows
            if (req.session.user.admin) {
                affectedRows = await messageModel.destroy({ where: { id }})
            } else {
                const userId = req.session.user.id
                affectedRows = await messageModel.destroy({ where: { id, userId }})
            }

            if (affectedRows === 0) {
                return app.handleError(res, 403)
            }

            res.json({
                message: null
            })
        } catch(error) {
            console.error(error)
            return res.status(503).end()
        }
    })

    app.post('/edit-message/:id', async (req, res) => {
        if (!req.session.user) {
            return app.handleError(res, 403, "Unauthorized users can't edit messages")
        }

        const id = req.params.id
        if (!id) {
            return app.handleError(res, 400, "ID of the message must be specified")
        }

        const content = req.body.content.trim()
        if (!content) {
            return app.handleError(res, 400, "Message can't be empty")
        }

        try {
            const userId = req.session.user.id

            let result
            if (req.session.user.admin) {
                result = await messageModel.update({ content }, { where: { id }})
            } else {
                result = await messageModel.update({ content }, { where: { id, userId }})
            }
            const affectedRows = result[0]

            if (affectedRows === 0) {
                return app.handleError(res, 403)
            }

            const message = await messageModel.findOne({ where: { id } })

            res.json({
                message: {
                    id: message.id,
                    content: message.content,
                    createdAt: message.createdAt,
                    user: {
                        id: userId,
                        login: req.session.user.login
                    }
                }
            })
        } catch(error) {
            console.error(error)
            return res.status(503).end()
        }
    })
}

export default messages