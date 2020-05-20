const { check, validationResult } = require('express-validator');
const db = require('../../models')
const Mahasiswa = db.mahasiswa

exports.mahasiswa = [

    check('nama').notEmpty().withMessage('nama tidak boleh kosong'),
    // check('file').notEmpty().withMessage('foto tidak boleh kosong'),
    check('nim').isLength({ min: 3 })
        .withMessage('nim minimal 3 karakter'),
    check('nim').custom((value) => {
        return Mahasiswa.findOne({
            where:{nim: value}
        }).then(nim=>{
            if (nim) {
                return Promise.reject('Nim sudah terdaftar');
            }
        })
    })
    
]

exports.mahasiswaUpdate = [
    check('nama').notEmpty().withMessage('nama tidak boleh kosong'),
    // check('file').notEmpty().withMessage('foto tidak boleh kosong'),
    check('nim').isLength({ min: 3 })
        .withMessage('nim minimal 3 karakter'),
    // check('nim').custom((value) => {
    //     return Mahasiswa.findOne({
    //         where:{nim: value}
    //     }).then(nim=>{
    //         if (nim) {
    //             return Promise.reject('Nim sudah terdaftar');
    //         }
    //     })
    // })
]