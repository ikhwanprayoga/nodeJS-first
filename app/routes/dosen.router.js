module.exports = app => {
    const dosen = require('../controllers/dosen.controller')
    var verifyToken = require('../routes/verifytoken')

    let router = require('express').Router()

    //prefix
    app.use('/api/dosen', router)

        //index
        router.get('/', verifyToken, dosen.index)

        router.post('/store', verifyToken, dosen.store)

        router.put('/update/:id', verifyToken, dosen.update)

        router.delete('/delete/:id', verifyToken, dosen.delete)
}