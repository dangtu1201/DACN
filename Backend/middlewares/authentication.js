import {generateToken, updateRefreshToken, decodeToken} from "./verifyToken.js";
import { User } from "../../models/userModel.js";
import { Login } from "../../models/loginModel.js";
import { loginValidator } from '../../validation/validation.js';
import jwtVariable from '../../models/auth_var/jwt.js';
import randToken from 'rand-token';
import moment from 'moment-timezone';


export async function login(req, res) {
    const { error } = loginValidator(req.body);
        if (error) return res.status(422).send(error.details[0].message);

	const date = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();

	const phone = req.body.phone.toLowerCase() || 'test';
	const password = req.body.password || '12345';
    // rs._id.toString()
    const result = await User.findOne( {phone: phone})
    if (!result)
        await User.findOne( {email: phone})
    // return res.status(500).send('Found');

	if (!result) {
		return res.status(401).send('Phone/email not exist!');
	}

	const isPasswordValid = (password === result.password);
	if (!isPasswordValid) {
		return res.status(401).send('Wrong password!');
	}

	const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const dataForAccessToken = {
		phone: result.phone,
	};

	const accessToken = await generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);

	if (!accessToken) {
		return res
			.status(401)
			.send('Login failed successfully ! Please try again !');
	}

	let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
	if (!result.refreshToken) {
		// Nếu user này chưa có refresh token thì lưu refresh token đó vào database
		await updateRefreshToken(result.phone, refreshToken);
	} else {
		// Nếu user này đã có refresh token thì lấy refresh token đó từ database
		refreshToken = result.refreshToken;
	}
	
	await Login.findOneAndUpdate({phone: phone},{phone: phone, loginAt: date, refreshToken: refreshToken, $unset: { logoutAt: "" }}, {upsert: true})
	
	return res.json({
		msg: `Welcome, ${result.phone}`,
		accessToken,
		refreshToken,
		result,
	});
};
export async function logout(req, res){
	const accessTokenFromHeader = req.header('Authorization');
	if (!accessTokenFromHeader) {
		return res.status(400).send('Access Token not found!');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
		
	const decoded = await decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);

	// console.log("accessTokenFromHeader", accessTokenFromHeader)
	// console.log("accessTokenSecret", accessTokenSecret)
	
	if (!decoded) {
		return res.status(400).send('Invalid Access Token!');
	}

	const phone = decoded.payload.phone; // Lấy phone từ payload

	const date = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();

    const result = await Login.findOne( {phone: phone})
        try {
            await Login.findOneAndUpdate({phone: result.phone}, {logoutAt: date, $unset: { refreshToken: "" }}, {upsert: false}, function(err, rs){
                res.status(200).send(rs);
            }).clone().catch(function(err){ console.log(err)})
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
    }
}

// exports.logout = async function(req, res){
// 	const {phone} = req.body
//         try {
//             await User.findOneAndRemove(phone, function(err, rs){
//                 res.status(200).send(rs);
//             }).clone().catch(function(err){ console.log(err)})
//         } catch (err) {
//             console.log("ERROR: " + err);
//             res.send("FAILED");
//     }
// }

export async function refreshToken (req, res) {
	// Lấy access token từ header
	const accessTokenFromHeader = req.header('Authorization');
	if (!accessTokenFromHeader) {
		return res.status(400).send('Access Token not found!');
	}

	// Lấy refresh token từ body
	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('Refresh Token not found!');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

	// Decode access token đó
	const decoded = await decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Invalid Access Token!');
	}

	const phone = decoded.payload.phone; // Lấy phone từ payload

    const result = await Login.findOne( {phone: phone})
    // console.log(result)

	if (!result) {
		return res.status(401).send('User not found!');
	}

    // console.log(refreshTokenFromBody, " is the same as ", result.refreshToken)

	if (refreshTokenFromBody !== result.refreshToken) {
		return res.status(400).send('Invalid Refresh Token');
	}
    

	// Tạo access token mới
	const dataForAccessToken = {
		phone,
	};

	const accessToken = await generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(400)
			.send('Failed to generate token! Please try again!');
	}
	return res.json({
		accessToken,
	});
};