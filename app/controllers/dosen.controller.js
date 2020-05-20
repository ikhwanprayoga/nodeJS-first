const models = require('../models')
const Dosen = models.dosen
const jwt = require('jsonwebtoken')

exports.index = (req, res) => {

    jwt.verify(req.token, 'secretkey', (err) => {
        if (err) {
            res.status(403).send({
                status: false,
                message: 'no auth'
            })
        }

        Dosen.findAll({ include: models.jabatan})
            .then((result) => {
                res.send(result)
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "some error when retrive all data dosen"
                })
            });
    })
}

exports.store = (req, res) => {
    //validation req
    if (!req.body.pangkat || !req.body.nama || !req.body.jabatanId) {
        res.status(400).send({
            message: 'nim dan nama cannot empty'
        })
        return
    }

    const dosen = {
        nama: req.body.nama,
        pangkat: req.body.pangkat,
        jabatanId: req.body.jabatanId,
    }

    Dosen.create(dosen)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when create mahasiwa"
            })
        });
}

exports.update = (req, res) => {

    if (!req.body.pangkat || !req.body.nama || !req.body.jabatanId) {
        res.status(400).send({
            message: 'nama, jabatan dan pangkat cannot empty'
        })
        return
    }

    const idDosen = req.params.id

    Dosen.update(req.body, {
        where: {id: idDosen}
    }).then((result)=>{
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || " error update post with id: "+idDosen
        })
    });
}

exports.delete = (req, res) => {
    const idDosen = req.params.id
    Dosen.destroy({
        where: { id: idDosen }
    }).then((result) => {
        
        if (result) {
            res.send({
                message: "data dosen with id: "+idDosen+" was successfully destroy"
            })
        } else {
            res.send({
                message: "data with id: "+idDosen+" not found"
            })
        }

    }).catch((err) => {
       res.status(500).send({
           message: 
                err.message || "some error when destroy data"
       }) 
    });
}