import { User } from "../model/userModel.js";
import { registerValidator, editUserValidator } from '../controller/validation/validate.js';
// const verifyToken = require('../controller/middlewares/verifyToken.js');

// exports.getUser = async function(req, res) {
//     const {id} = req.params;
//     console.log(id);
//     try {
//         User.findById(id, function(err, rs){
//             res.status(200).send(rs);
//         })
//     } catch (err) {
//         console.log("ERROR: " + err);
//         res.send("FAILED");
//     }
// }

export async function getUser(req, res) {
        const {id} = req.params;
        try {
            //console.log(id);
            await User.findById(id, function(err, rs){
                User.count(function (err, count) {
                    if (count === 0) {
                        return res.status(404).send('List empty!');
                    }
                    else if (count !=0 && !rs)
                        return res.status(404).send('User not found!');
                    else{
                        console.log('Found user: ', rs)
                        return  res.status(200).json({data: rs});
                    }
                });
            }).clone().catch(function(err){ console.log(err)})
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}

export async function getAllUser(req, res) {
        try {
            await User.find({}, function(err, rs){
                User.count(function (err, count) {
                    if (count === 0) {
                        return res.status(404).send('List empty!');
                    }
                    else{
                        console.log('List of all users: ', rs)
                        return  res.status(200).json({data: rs});
                    }
                });
            }).clone().catch(function(err){ console.log(err)})
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}

export async function addUser(req, res) {
        try {
            const { error } = registerValidator(req.body);
            if (error) return res.status(422).send(error.details[0].message);

            const checkUsername = await User.findOne({ username: req.body.username });
            const checkEmail = await User.findOne({ email: req.body.email });

            if (checkUsername) return res.status(422).send('Username already existed');
            if (checkEmail) return res.status(422).send('Email already existed');
            console.log("Received add request: ", req.body)
            // const result = 
            await User.create(req.body, function(err, rs){
                return  res.status(200).json({data: rs});
            })
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}

// exports.updateUser = function(req, res) {
//     const {id} = req.body;
//     try {
//         User.findByIdAndUpdate(id, req.body, {new: true}, function(err, rs){
//             res.status(200).send(rs);
//         })
//     } catch (err) {
//         console.log("ERROR: " + err);
//         res.send("FAILED");
//     }
// }

export async function updateUser(req, res) {
        const {id} = req.params

        const date = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();
        body: Object.assign(previousBody, {
            updateAt: date
          })
        try {
            const { error } = editUserValidator(req.body);
            if (error) return res.status(422).send(error.details[0].message);

            const checkUsername = await User.findOne({ username: req.body.username });
            const checkEmail = await User.findOne({ email: req.body.email });

            if (checkUsername) return res.status(422).send('Username already existed');
            if (checkEmail) return res.status(422).send('Email already existed');


            await User.findByIdAndUpdate(id, {$set:req.body}, {new: true}, function(err, rs){
            // console.log("Length: ", Object.keys(req.body[0]).length);
                User.count(function (err, count) {
                if (count === 0) {
                    return res.status(404).send('List empty!');
                }
                else if (count != 0 && !rs) {
                    return res.status(404).send('User not found!');
                }
                else{
                    console.log('Update user', id, 'with following field(s):', req.body);
                    res.status(200).send(rs);
                }
            });
            }).clone().catch(function(err){ console.log(err)})
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}

// exports.deleteUser = function(req, res) {
//     const {id} = req.params;
//     try {
//         User.findByIdAndRemove(id, function(err, rs){
//             res.status(200).send(rs);
//         })
//     } catch (err) {
//         console.log("ERROR: " + err);
//         res.send("FAILED");
//     }
// }

export async function deleteUser(req, res) {
        const {id} = req.params
        try {
            await User.findByIdAndRemove(id, function(err, rs){
                User.count(function (err, count) {
                    if (count === 0) {
                        return res.status(404).send('List empty!');
                    }
                    else if (count != 0 && !rs) {
                        return res.status(404).send('User not found!');
                    }
                    else{
                        console.log('Deleted user with id: ', id);
                        res.status(200).send(rs);
                    }
                });
            }).clone().catch(function(err){ console.log(err)})
        } catch (err) {
            console.log("ERROR: " + err);
            res.send("FAILED");
        }
}
