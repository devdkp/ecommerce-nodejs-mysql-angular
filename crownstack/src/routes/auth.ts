import express, { Request, Response } from 'express';
import { generateHash } from '../utils/utils-method'
import jwt from 'jsonwebtoken'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const internalIp = require('internal-ip');
import connection from '../config/db'

//const Auth = require('../models/auth');

const AuthRouter = express.Router();

AuthRouter.get('/', (req: Request, res: Response) => {
    res.send('This is auth home page');
})

AuthRouter.post('/login', async(req, res) =>{

    try{
        const {email, password} = req.body;

        if(!email || !password)
        {
            res.json({
                status:400,
                message: 'Please provide Email and password'
            })
        }
    
        connection.query('SELECT * FROM users WHERE email=?', [email], async(error, results) =>{
 
            if(!results || !(await bcrypt.compare(password, results[0].password)))
            {
                res.json({
                    status:401,
                    message: 'Username and password not matched'
                })
            }

            const accessToken = jwt.sign({ name: results[0].name, email: results[0].email }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
                                     res.status(200).json({
                                         message: 'Logged in successful ....',
                                         status: 200,
                                         token: accessToken
            
                                     })
        })
    }
    catch(error){

    }
    

    
})

// AuthRouter.post('/login', (req: Request, res: Response) => {
//     // res.send(req.body);

//     Auth.find({ emailId: req.body.emailId })
//         .exec()
//         .then(user => {
//             if (user.length < 1) {
//                 return res.status(400).json({
//                     message: 'Username && password not matched',
//                     status: 400

//                 })
//             }
//             else {
//                 bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//                     if (err) {
//                         return res.status(400).json({
//                             message: 'Username && password not matched',
//                             status: 400
//                         })
//                     }

//                     if (result) {
//                         const accessToken = jwt.sign({ name: user[0].name, email: user[0].emailId, role: user[0].role }, process.env.JWT_SECRET);
//                         return res.status(200).json({
//                             message: 'Logged in successful ....',
//                             status: 200,
//                             token: accessToken

//                         })
//                     }
//                     return res.status(401).json({
//                         message: 'Auth failed',
//                         status: 401
//                     })
//                 })
//             }


//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400).json({
//                 message: "Something Went Wrong",
//                 status: 400
//             });
//         })
// })

AuthRouter.get('/users', (req, res) =>{

    connection.query('select * from users', (error, result) =>{
        if(error) throw error;
        res.send(result);
    })
})

AuthRouter.post('/register', (req: Request, res: Response) => {


   const myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {

        let currentDate = new Date();
        let usersData = {
            name: req.body.name,
            email: req.body.email,
            contactNo: req.body.contactNo,
            password: hash,
            timeStamp: currentDate,
            
        }
        console.log(usersData)

        connection.query('INSERT INTO users SET ?',usersData, function (error, results, fields) {
         if (error) {
              res.json({
                  status:false,
                  message:'there are some error with query'
              })
            }else{
                res.json({
                  status:200,
                  data:results,
                  message:'user registered sucessfully'
              })
            }
        })
    })

       
       

});


export default AuthRouter;