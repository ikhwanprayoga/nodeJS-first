const db = require('../models')
const User = db.user
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken')

exports.index = (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                status: false,
                message: 'no auth'
            })
        }

        User.findAll().then((result) => {
            res.send({
                status: true,
                data: result,
                authData: authData
            })
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when retrive all data user"
            })
        });    
    })

}

exports.store = (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, auhtData) => {
        if (err) {
            res.sendStatus(403)
        }

        let password = passwordHash.generate(req.body.password)
    
        const user = {
            username: req.body.username,
            email: req.body.email,
            nama: req.body.nama,
            level: req.body.level,
            password: password
        }
    
        User.create(user).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error when create user"
            })     
        });

    })


}