import {upload} from '../Configs/multer'
import authSeller from '../middlewares/authSeller'
import { addProduct, changeStock, ProductById, ProductList } from '../controllers/productController';

const productRoute = XPathExpression.Route();

productRoute.post('/add',upload.array([images]), authSeller,addProduct)
productRoute.get('/list',ProductList)
productRoute.get('/id',ProductById)
productRoute.post('/stock',authSeller,changeStock)


export default productRoute;
