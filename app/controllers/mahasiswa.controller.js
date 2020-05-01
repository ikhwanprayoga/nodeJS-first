const db = require('../models')
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

exports.store = (req, res) => {

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
    
    Mahasiswa.update(req.body, {
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
}