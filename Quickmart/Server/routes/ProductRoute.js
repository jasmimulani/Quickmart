import express from 'express';
import { upload } from '../Configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { 
  addProduct, 
  changeStock, 
  ProductById, 
  ProductList, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';

const productRoute = express.Router();

// Optional: Root endpoint for /api/product
productRoute.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Product API is running',
    endpoints: [
      { method: 'POST', path: '/add', description: 'Add new product (requires seller auth)' },
      { method: 'GET', path: '/list', description: 'Get all products' },
      { method: 'GET', path: '/:id', description: 'Get product by ID' },
      { method: 'POST', path: '/stock', description: 'Update stock (requires seller auth)' },
      { method: 'PUT', path: '/update/:id', description: 'Update product (requires seller auth)' },
      { method: 'DELETE', path: '/delete/:id', description: 'Delete product (requires seller auth)' }
    ]
  });
});

// Product routes
productRoute.post('/add', upload.array(["images"]), authSeller, addProduct);
productRoute.get('/list', ProductList);
productRoute.get('/:id', ProductById); // Changed from '/id' to '/:id'
productRoute.post('/stock', authSeller, changeStock);
productRoute.put('/update/:id', authSeller, updateProduct);
productRoute.delete('/delete/:id', authSeller, deleteProduct);

export default productRoute;