const express = require('express');

const router = express.Router();

router.get('/cart/products', async (req, res) => {
	res.send('carts');
});

module.exports = router;
