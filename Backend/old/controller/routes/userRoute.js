import { getAllUser, addUser, getUser, updateUser, deleteUser } from '../userController.js';
import { Router } from 'express';
const router = Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import verifyToken from '../middlewares/verifyToken.js';

router.get("/test", function(req, res){
    res.send("User route called!");
});

router.get('/getAll', verifyToken, getAllUser);
router.post('/add', addUser);
router.get('/:id', verifyToken, getUser);
router.put('/:id/update', verifyToken, jsonParser, updateUser);
router.delete('/:id/delete', verifyToken, jsonParser, deleteUser);


export default router;
