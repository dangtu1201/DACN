import { Product } from "../model/productModel.js";
import { User } from "../model/userModel.js";
import { getInfo } from "./tokenController.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
import moment from 'moment-timezone';

export async function getProduct(req, res) {
        const accessTokenFromHeader = req.header("Authorization");
        if (!accessTokenFromHeader) {
            return res.status(400).send('Access Token not found!');
        }
        
        const decoded = await getInfo(
            accessTokenFromHeader
        );
        
        if (!decoded) {
            return res.status(400).send('Invalid Access Token!');
        }

        const ID = decoded.payload.userID; // Lấy username từ payload
        try {
            //console.log(id);
            const result = await Product.find({userID: ID}, function(err, rs){
                res.status(200).send(rs);
            }).clone().catch(function(err){ console.log(err)})
            // console.log('Found product(s): ', result)
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}

export async function getByToken(req, res) {
    
    const decoded = await getInfo(req.header("Authorization"));

	const username = decoded.payload.username; // Lấy username từ payload

    try {
        //console.log(id);
        const result = await Product.find({username: username}, function(err, rs){
            res.status(200).send(rs);
        }).clone().catch(function(err){ console.log(err)})
        // console.log('Found product(s): ', result)
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
}

export async function getAllProduct(req, res) {
        try {
            const result = await Product.find({}, function(err, rs){
                res.status(200).send(rs);
            }).clone().catch(function(err){ console.log(err)})
            console.log('All product: ', result)
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}

export async function addProduct(req, res) {
        const decoded = await getInfo(req.header("Authorization"));

        const username = decoded.payload.username; // Lấy username từ payload
        var previousBody = req.body;

        const date = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();

        body: Object.assign(previousBody, {
            username: username,
            date: date,
          })

        try {
            await Product.create(req.body, function(err, rs){
                res.status(200).send(rs);
            })
            console.log('Added products: ', req.body)
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}

export async function updateProduct(req, res) {
        const {id} = req.params

        const date = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();
        body: Object.assign(previousBody, {
            updateAt: date
          })
        try {
            console.log('Update product with id: ', req.body);
            await Product.findByIdAndUpdate(id, {$set:req.body}, {new: true}, function(err, rs){
                res.status(200).send(rs);
            }).clone().catch(function(err){ console.log(err)})
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}

export async function deleteProduct(req, res) {
        const {id} = req.params
        try {
            console.log('Delete product with id: ', id);
            await Product.findByIdAndRemove(id, function(err, rs){
                res.status(200).send(rs);
            }).clone().catch(function(err){ console.log(err)})
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}