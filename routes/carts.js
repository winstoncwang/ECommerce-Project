const express = require('express');

const cartsRepo = require('../repositories/carts');

const router = express.Router();

//route for add to cart button POST
router.post('/cart/products', async (req, res) => {
	//check the cart id
	let cart;
	if (!req.session.cartId) {
		//if a new user create a cart id
		cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		//find existing cart id
		cart = await cartsRepo.getOne(req.session.cartId);
	}

	//find if there is a existingItem
	const existingItem = cart.items.find(
		(item) => item.id === req.body.productId
	);

	if (existingItem) {
		//increment quantity
		existingItem.quantity++;
	} else {
		//add to items
		cart.items.push({ id: req.body.productId, quantity: 1 });
	}

	//update(id, items:cart.items)
	await cartsRepo.update(cart.id, { items: cart.items });

	res.send('product added!');
});

//route for display cart products GET
//route for delete button in cart product page POST

module.exports = router;
