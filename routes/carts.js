const express = require('express');

const cartsRepo = require('../repositories/carts');

const router = express.Router();

//route for add to cart button POST
router.post('/cart/products', async (req, res) => {
	//check the cart id
	if (!req.session.cartId) {
		//if a new user create a cart id
		const cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		//find existing cart id
		const cart = await cartsRepo.getOne(req.session.cartId);
	}
});

//route for display cart products GET
//route for delete button in cart product page POST

module.exports = router;
