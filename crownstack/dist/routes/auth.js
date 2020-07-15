"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
const internalIp = require('internal-ip');
const db_1 = __importDefault(require("../config/db"));
//const Auth = require('../models/auth');
const AuthRouter = express_1.default.Router();
AuthRouter.get('/', (req, res) => {
    res.send('This is auth home page');
});
AuthRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.json({
                status: 400,
                message: 'Please provide Email and password'
            });
        }
        db_1.default.query('SELECT * FROM users WHERE email=?', [email], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (!results || !(yield bcrypt.compare(password, results[0].password))) {
                res.json({
                    status: 401,
                    message: 'Username and password not matched'
                });
            }
            const accessToken = jsonwebtoken_1.default.sign({ name: results[0].name, email: results[0].email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(200).json({
                message: 'Logged in successful ....',
                status: 200,
                token: accessToken
            });
        }));
    }
    catch (error) {
    }
}));
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
AuthRouter.get('/users', (req, res) => {
    db_1.default.query('select * from users', (error, result) => {
        if (error)
            throw error;
        res.send(result);
    });
});
AuthRouter.post('/register', (req, res) => {
    const myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        let currentDate = new Date();
        let usersData = {
            name: req.body.name,
            email: req.body.email,
            contactNo: req.body.contactNo,
            password: hash,
            timeStamp: currentDate,
        };
        console.log(usersData);
        db_1.default.query('INSERT INTO users SET ?', usersData, function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'there are some error with query'
                });
            }
            else {
                res.json({
                    status: 200,
                    data: results,
                    message: 'user registered sucessfully'
                });
            }
        });
    });
});
exports.default = AuthRouter;
//# sourceMappingURL=auth.js.map