import express from 'express';
import {upload} from '../Configs/multer.js'
import authSeller from '../middlewares/authSeller.js'
import { addProduct, changeStock, ProductById, ProductList } from '../controllers/productController.js';

const productRoute = express.Router();

productRoute.post('/add',upload.array(["images"]), authSeller,addProduct)
productRoute.get('/list',ProductList)
productRoute.get('/id',ProductById)
productRoute.post('/stock',authSeller,changeStock)


export default productRoute;
