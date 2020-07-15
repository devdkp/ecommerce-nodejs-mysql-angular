import express, { Request, Response } from 'express';
import connection from '../config/db'


const shopRoute = express.Router();


shopRoute.get('/products', (req, res) =>{

    connection.query('select * from products', (error, results) =>{
        if (error) {
            res.json({
                status:400,
                message:'there are some error with query'
            })
          }else{
              res.json({
                status:200,
                data:results,
                message:'Produt list'
            })
          }
    })
})

shopRoute.post('/getCartProducts', (req, res) =>{

    const { email, status} = req.body;

    connection.query('select * from cart where user_email=? and status=?', [email, status], (error, results) =>{
        if (error) {
            res.json({
                status:400,
                message:'there are some error with query'
            })
          }else{
              res.json({
                status:200,
                data:results,
                message:'Cart Item  list'
            })
          }
    })
})

shopRoute.post('/addToCart', (req, res) =>{

    let products = {
        user_email: req.body.user_email,
        product_name: req.body.product_name,
        original_price:req.body.original_price,
        offer_price:req.body.offer_price,
        offer:req.body.offer,
        color: req.body.color,
        brand: req.body.brand,
        size: req.body.size,
        qty: req.body.qty,
        category: req.body.category,
        description: req.body.description,
        timeStamp: new Date(),
        pic_1: req.body.pic_1,
        pic_2: req.body.pic_2,
        status: 'Pending'
    }
    console.log(products);
    connection.query('INSERT INTO cart SET ?',products, function (error, results, fields) {
        if (error) {
             res.json({
                 status:false,
                 message:'there are some error with query'
             })
           }else{
               res.json({
                 status:true,
                 data:results,
                 message:`${products.product_name} is added in cart`
             })
           }
       })
})


export default shopRoute;