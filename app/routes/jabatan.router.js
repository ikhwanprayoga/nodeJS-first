module.exports = app => {
    const jabatan = require('../controllers/jabatan.controller')

    let router = require('express').Router()

    app.use('/api/jabatan', router)

        router.get('/', jabatan.index)

        router.get('/getDosens', jabatan.getDosens)

        router.get('/:id/getDosens', jabatan.getDosensById)
}