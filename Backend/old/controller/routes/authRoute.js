import { login, logout, refreshToken } from '../authController.js';
import { User } from "../../model/userModel.js";
import verifyToken from '../middlewares/verifyToken.js';
import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

router.get("/test", function(req, res){
    res.send("Auth route called!");
});

router.post("/get", verifyToken, function(req, res){
    User.find({}, function(err, users){
        req.send(users);
    });
});



router.post('/login', login);

router.post('/logout', logout);

router.post('/refresh', refreshToken);

export default router;