const db = require('../models')
const User = db.user
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken')

exports.loginJwt = (req, res) => {
    let usernameInput = req.body.username
    let passwordInput = req.body.password

    User.findOne({where: {username: usernameInput}}).then((result) => {
        let hashedPassword = result.password
        
        if (passwordHash.verify(passwordInput, hashedPassword)) {

            jwt.sign({result}, 'secretkey', { expiresIn: '1d'}, (err, token) => {
                res.json({
                    data: {
                        username: result.username,
                        nama: result.nama,
                        email: result.email,
                        level: result.level
                    },
                    token: token
                })
            })

        } else {
            res.send({
                status: 'false',
                message: 'periksa kembali password'
            })
        }

    }).catch((err) => {
        res.send({
            status: 'false',
            message: 'periksa kembali username dan password'
        })
    });
}

exports.login = (req, res) => {
    let passwordInput = req.body.password
    let usernameInput = req.body.username

    User.findOne({where: {username: usernameInput}}).then((result) => {
        let hashedPassword = result.password
        
        if (passwordHash.verify(passwordInput, hashedPassword)) {
            res.send({
                status: 'true',
                data: result
            })
        } else {
            res.send({
                status: 'false',
                message: 'periksa kembali password'
            })
        }

    }).catch((err) => {
        res.send({
            status: 'false',
            message: 'periksa kembali username dan password'
        })
    });
}