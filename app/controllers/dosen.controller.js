const models = require('../models')
const Dosen = models.dosen
// const Op = db.Sequilize.Op

exports.index = (req, res) => {
    Dosen.findAll({ include: models.jabatan})
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when retrive all data dosen"
            })
        });
}