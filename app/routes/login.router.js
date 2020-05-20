module.exports = app => {

    const login = require('../controllers/login.controller')

    let router = require('express').Router()

    app.use('/api/login', router)

        router.post('/', login.login)

        router.post('/jwt', login.loginJwt)

    
}