"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const constant_1 = require("./../utils/constant");
const shopRoute = express_1.default.Router();
shopRoute.get('/products', (req, res) => {
    db_1.default.query('select * from products', (error, results) => {
        if (error) {
            res.json({
                status: 400,
                message: 'there are some error with query'
            });
        }
        else {
            res.json({
                status: 200,
                data: results,
                message: 'Produt list'
            });
        }
    });
});
shopRoute.post('/getCartProducts', (req, res) => {
    const { email, status } = req.body;
    db_1.default.query('select * from cart where user_email=? and status=?', [email, constant_1.CartStatus.PENDING], (error, results) => {
        if (error) {
            res.json({
                status: 400,
                message: 'there are some error with query'
            });
        }
        else {
            res.json({
                status: 200,
                data: results,
                message: 'Cart Item  list'
            });
        }
    });
});
shopRoute.post('/addToCart', (req, res) => {
    let products = {
        user_email: req.body.user_email,
        product_name: req.body.product_name,
        original_price: req.body.original_price,
        offer_price: req.body.offer_price,
        offer: req.body.offer,
        color: req.body.color,
        brand: req.body.brand,
        size: req.body.size,
        qty: req.body.qty,
        category: req.body.category,
        description: req.body.description,
        timeStamp: new Date(),
        pic_1: req.body.pic_1,
        pic_2: req.body.pic_2,
        status: constant_1.CartStatus.PENDING
    };
    db_1.default.query('INSERT INTO cart SET ?', products, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            });
        }
        else {
            res.json({
                status: true,
                data: results,
                message: `${products.product_name} is added in cart`
            });
        }
    });
});
exports.default = shopRoute;
//# sourceMappingURL=shop.js.map