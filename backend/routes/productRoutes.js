const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/products', authenticateToken,  productController.addProductController);
router.get('/products', authenticateToken, productController.getProductsController);
router.put('/products/:id', authenticateToken, productController.updateProductController);
router.delete('/products/:id', authenticateToken, productController.deleteProductController);
router.get('/products/search', authenticateToken, productController.searchProductsController);
module.exports = router;