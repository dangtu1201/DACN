import jwt from 'jsonwebtoken';

export default function verify (req, res, next) {
    const token = req.header('Authorization');
    const bearer = token.replace(/^Bearer\s/, '');
    
    if (!bearer) return res.status(401).send('Access Denied');

    console.log("Api Token: ", bearer)
    // console.log("Api Header: ", req.headers.Authorization)
    console.log("Called from: ", req.originalUrl, "\n\n")

    try {
        const verified = jwt.verify(bearer, 'refresh-token-secret');
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};