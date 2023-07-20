import { getAllProduct, addProduct, getProduct, updateProduct, deleteProduct, getByToken } from '../productController.js';
import { Router } from 'express';
const router = Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import verifyToken from '../middlewares/verifyToken.js';

router.get("/test", function(req, res){
    res.send("Product route called!");
});

router.get('/getAll', verifyToken, getAllProduct);
router.post('/add', verifyToken, addProduct);
router.get('/get', verifyToken, getProduct);
router.post('/:id/update', verifyToken, jsonParser, updateProduct);
router.delete('/:id/delete', verifyToken, jsonParser, deleteProduct);
router.get('/:token/get', verifyToken, getByToken);


export default router;
