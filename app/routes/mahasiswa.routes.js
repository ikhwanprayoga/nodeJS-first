module.exports = app => {
    const mahasiswa = require('../controllers/mahasiswa.controller')

    let router = require('express').Router()

    //prefix
    app.use('/api/mahasiswa', router)

        //get all mahasiswa
        router.get('/', mahasiswa.index)

        //store mahasiswa
        router.post('/store', mahasiswa.store)

        //find a data
        router.get('/:id', mahasiswa.findOne)

        //update data
        router.put('/update/:id', mahasiswa.update)

        //destroy a data
        router.delete('/delete/:id', mahasiswa.destroy)
}