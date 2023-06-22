import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Login } from "../model/loginModel.js";
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

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
		console.log(`Error in generate access token:  + ${error}`);
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
	const bearer = token.replace(/^Bearer\s/, '');
	try {
		return await verify(bearer, secretKey, {
			ignoreExpiration: true,
		});
	} catch (error) {
		console.log(`Error in decode access token: ${error}`);
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
			'refresh-token-secret';
			
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
