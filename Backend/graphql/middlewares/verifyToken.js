import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Login } from "../../model/loginModel.js";
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

export function verifyToken (req, res, next) {
    const token = req.header('Authorization');

	const bearer = token;
    // const bearer = token.replace(/^Bearer\s/, '');
    
    if (!bearer) return res.status(401).send('Access Denied');

    console.log("Api Token: ", token)
     // console.log("Api Header: ", req.headers.Authorization)
    console.log("Called from: ", req.originalUrl, "\n\n")

    try {
        const verified = jwt.verify(bearer, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};

export async function generateToken(payload, secretSignature, tokenLife) {
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate token:  + ${error}`);
		return null;
	}
}

export async function updateRefreshToken (phone, refreshToken) {
	try {
		await Login.findOneAndUpdate({phone: phone}, {refreshToken: refreshToken}, {upsert: true});
		return true;
	} catch {
		return false;
	}
}

export async function decodeToken(token, secretKey) {
	// const bearer = token.replace(/^Bearer\s/, '');
	
	//if (token.length > 2) console.log("Test Token in case passed: ", token)
	try {
		return await verify(token, secretKey, {
			ignoreExpiration: true,
		});
	} catch (error) {
		//console.log("Test Token in case error: ", token)
		console.log(`Error in decode token: ${error}`);
		//console.log("Who is this mtfk ?")
		return null;
	}
}

export async function getInfo(header) {
	try {
		const accessTokenFromHeader = header;
		const bearer = accessTokenFromHeader.replace(/^Bearer\s/, '');

		if (!bearer) {
			return res.status(400).send('Access Token not found!');
		}

		const accessTokenSecret =
			process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
			
		const decoded = await decodeToken(
			bearer,
			accessTokenSecret,
		);

		// console.log("accessTokenFromHeader", accessTokenFromHeader)
		// console.log("accessTokenSecret", accessTokenSecret)
		
		if (!decoded) {
			return res.status(400).send('Invalid Access Token!');
		}

		return decoded;

	} catch (error) {
		console.log(`Error in decode access token: ${error}`);
		return null;
	}
}