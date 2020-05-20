const db = require('../models')
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const fs = require('fs')
const Mahasiswa = db.mahasiswa

// const Op = db.Sequilize.Op

exports.index = (req, res) => {
    Mahasiswa.findAll()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when retrive all data mahasiswa"
            })
        });
}

exports.storeOld = (req, res) => {

    //validation req
    if (!req.body.nim || !req.body.nama) {
        res.status(400).send({
            message: 'nim dan nama cannot empty'
        })
        return
    }

    //object nampung request
    const mahasiswa = {
        nim: req.body.nim,
        nama: req.body.nama,
        alamat: req.body.alamat,
        poin: req.body.poin
    }

    Mahasiswa.create(mahasiswa)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when create mahasiwa"
            })
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Mahasiswa.findByPk(id)
        .then((result) => {
            
            if (!result) {
                res.send({
                    message: "data with id: "+id+" not found"
                })
            } else {
                res.send(result)
            }

        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when find data"
            })
        });
}

exports.update = (req, res) => {
    const idMhs = req.params.id
    const mahasiswa = {
        nim: '',
        nama: '',
        alamat: '',
        foto: '',
        poin: '',
    }

    //handling error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    }

    if (req.files) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.file;
        let sampleName = sampleFile.name;
        let arr = sampleName.split(".")
        let ext = arr[1]
        let md5Name = crypto.createHash('md5').update(req.body.nim).digest("hex")
        let fileName = md5Name+'.'+ext
        
        if (sampleFile.mimetype == 'image/png' || sampleFile.mimetype == 'image/jpeg') {
        
        } else {
            // res.send('bukan png')
            return res.status(422).send({ errors:[
                {
                    "value": "file",
                    "msg": "Harus file foto (jpg, jpeg, png)",
                    "param": "file",
                    "location": "body"
                }
            ] })
        }

        sampleFile.mv('./public/mahasiswa/'+fileName, (err) => {
        })
        
        mahasiswa.foto= fileName
    }

    //object nampung request
    mahasiswa.nim= req.body.nim,
    mahasiswa.nama= req.body.nama,
    mahasiswa.alamat= req.body.alamat,
    mahasiswa.poin= req.body.poin,
    
    Mahasiswa.update(mahasiswa, {
        where: { id: idMhs }
    }).then((result) => {
        
        if (result == true) {
            res.send({
                message: "data was updated",
                data: result
            })
        } else {
            res.send({
                message: "cannot update post with id "+idMhs
            })
        }

    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || " error update post with id: "+idMhs
        })
    });
}

exports.destroy = (req, res) => {
    const idMhs = req.params.id
    var path = ''

    Mahasiswa.findByPk(idMhs).then((resultData)=>{
        if (resultData.foto) {
            path = './public/mahasiswa/'+resultData.foto
            fs.unlink(path, (err) => {
                if (err) {
                    return res.status(422).send({ errors:[
                        {
                            "value": "file",
                            "msg": "tidak terdapat foto",
                            "param": "file",
                            "location": "body"
                        }
                    ] })
                }
            
                //file removed
            })
        }

        Mahasiswa.destroy({
            where: { id: idMhs }
        }).then((result) => {
            
            if (result) {
                res.send({
                    message: "data mahasiswa with id: "+idMhs+" was successfully destroy"
                })
            } else {
                res.send({
                    message: "data with id: "+idMhs+" not found"
                })
            }
    
        }).catch((err) => {
           res.status(500).send({
               message: 
                    err.message || "some error when destroy data"
           }) 
        });
    })
}

exports.uploadFile = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
        
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let sampleName = sampleFile.name;
    // return res.send(sampleName)

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./public/mahasiswa/'+sampleName, function(err) {

        if (err)
            return res.status(500).send(err);
    
        res.send('File uploaded!');
    });
}

exports.store = (req, res) => {
    //error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    }

    // return res.send(sampleFile.mimetype)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(422).send({ errors:[
            {
                "value": "file",
                "msg": "Harus melampirkan foto",
                "param": "file",
                "location": "body"
            }
        ] });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    let sampleName = sampleFile.name;
    let arr = sampleName.split(".")
    let ext = arr[1]
    let md5Name = crypto.createHash('md5').update(req.body.nim).digest("hex")
    let fileName = md5Name+'.'+ext

    if (sampleFile.mimetype == 'image/png' || sampleFile.mimetype == 'image/jpeg') {
        
    } else {
        // res.send('bukan png')
        return res.status(422).send({ errors:[
            {
                "value": "file",
                "msg": "Harus file foto (jpg, jpeg, png)",
                "param": "file",
                "location": "body"
            }
        ] })
    }
    
    //upload file
    sampleFile.mv('./public/mahasiswa/'+fileName, (err) => {
        
        if (err) {
            return res.status(500).send(err)
        }

        //object nampung request
        const mahasiswa = {
            nim: req.body.nim,
            nama: req.body.nama,
            alamat: req.body.alamat,
            poin: req.body.poin,
            foto: fileName
        }
        
        Mahasiswa.create(mahasiswa)
            .then((result) => {
                res.send(result)
            })
            // .catch((err) => {
            //     res.status(500).send({
            //         message:
            //             err.message || "some error when create mahasiwa"
            //     })
            // });
    })
}