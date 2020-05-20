module.exports = app => {

    const user = require('../controllers/user.controller')
    var verifyToken = require('../routes/verifytoken')

    let router = require('express').Router()

    app.use('/api/user', router)

        router.get('/', verifyToken,  user.index)
        router.post('/store', verifyToken, user.store)

}