const models = require('../models')
const Jabatan = models.jabatan

exports.index = (req, res) => {
    Jabatan.findAll()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when retrive all data jabatan"
            })
        });
}

exports.getDosens = (req, res) => {
    Jabatan.findAll({include: models.dosen})
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when retrive all data dosen with jabatan"
            })
        });
}

exports.getDosensById = (req, res) => {
    const id = req.params.id

    Jabatan.findByPk(id, { include: models.dosen })
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when retrive all data dosen with id jabatan"
            })
        });
}