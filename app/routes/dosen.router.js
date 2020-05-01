module.exports = app => {
    const dosen = require('../controllers/dosen.controller')

    let router = require('express').Router()

    //prefix
    app.use('/api/dosen', router)

        //index
        router.get('/', dosen.index)
}