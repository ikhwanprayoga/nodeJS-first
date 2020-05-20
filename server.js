const express       = require('express')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const jwt           = require('jsonwebtoken')
const fileUpload    = require('express-fileupload');
const md5           = require('md5');
const { check, validationResult } = require('express-validator');

const app = express()

app.use(fileUpload())

//use static public path
app.use(express.static('public'))

//inisialisasi index model
const db = require('./app/models')
//sync model agar dpt melakukan migration
// db.sequelize.sync()

let whiteList = [
    'http://localhost:3000'
]

let corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, callback)
        } else {
            callback(new Error("not allowed by CORS"))
        }
    }
}

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });


app.use(cors(corsOption))

//parse req content-type : application/JSON
app.use(bodyParser.json())

//parse req conten-type : x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: true}))

//space register route
app.get('/', (req, res) => {
    res.json({
        message: "welcome to express node"
    })
})

//tyr jwt token
app.get('/api/jwt', (req, res) => {
    res.json({
        message: 'wellcome to jwt express js node'
    })
})

app.post('/api/jwt/post', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'post ...',
                authData
            })
        }
    })

})

app.post('/api/jwt/login', (req, res) => {
    //user
    const user = {
        id: 1, 
        username: 'ikhwan',
        email: 'ikhwan@email.com'
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
        res.json({
            token: token
        })
    })
})

//  fungsi upload file
app.post('/api/upload', [
        check('nim').isEmail(),
    ], (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let sampleName = sampleFile.name;
    // return res.send(sampleName)
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./app/uploads/'+sampleName, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });

//format of token
//auhtorization: Bearer <access_token>

//verify token
function verifyToken(req, res, next) {
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

//register route was created
require('./app/routes/mahasiswa.routes')(app)
require('./app/routes/dosen.router')(app)
require('./app/routes/jabatan.router')(app)
require('./app/routes/user.router')(app)
require('./app/routes/login.router')(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("server running on http://localhost:"+PORT)
})