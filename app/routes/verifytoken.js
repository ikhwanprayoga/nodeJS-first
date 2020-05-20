module.exports = function verifyToken (req, res, next) {
    //get auht header value
    const bearerHeader = req.headers['authorization']

    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //verivy token
        //slit at the sapce
        const bearer = bearerHeader.split(' ')
        //get token from index 1 array bearer
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //next midleware
        next()        
    } else {
        //forbidden
        res.sendStatus(403)
    }
}