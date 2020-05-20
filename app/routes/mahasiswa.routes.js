// const { check, alreadyHaveEmail } = require('express-validator');
// const db = require('../models')
// const Mahasiswa = db.mahasiswa


module.exports = app => {

    const validation = require('../controllers/validation/validationMahasiswa')
    const mahasiswa = require('../controllers/mahasiswa.controller')

    let router = require('express').Router()

    //prefix
    app.use('/api/mahasiswa', router)

        //get all mahasiswa
        router.get('/', mahasiswa.index)

        //store mahasiswa
        router.post('/store', validation.mahasiswa, mahasiswa.store)

        //find a data
        router.get('/:id', mahasiswa.findOne)

        //update data
        router.put('/update/:id', validation.mahasiswaUpdate, mahasiswa.update)

        //destroy a data
        router.delete('/delete/:id', mahasiswa.destroy)

        //post data
        router.post('/upload/file', mahasiswa.uploadFile)

        //store profile mahasiswa and foto
        // router.post('/upload/profile', mahasiswa.storeProfile)

        // router.post('/upload/profile', validation.mahasiswa, mahasiswa.storeProfile)

}