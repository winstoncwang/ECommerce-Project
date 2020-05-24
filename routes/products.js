const express = require('express');
const productsRepo = require('../repositories/products');

const productsIndexTemp = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemp({ products }));
});
2
module.exports = router;
