const express = require("express");

const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");

const cartsShowTemp = require("../views/carts/show");

const router = express.Router();

//route for add to cart button POST
router.post("/cart/products", async (req, res) => {
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

  res.send("product added!");
});

//route for display cart products GET
router.get("/cart", async (req, res) => {
  //check if they have a cartId or is an existing user
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    //hand product info to cart object
    //this is not written into the repo, so no duplicated data.
    item.product = product;
  }

  res.send(cartsShowTemp({ items: cart.items }));
});

//route for delete button in cart product page POST
router.post("/cart/:id/delete", async (req, res) => {
  const cart = await cartsRepo.getOne(req.session.cartId);

  //filter out the req.params.id for the product and write the rest in cart repo
  const filteredCart = cart.items.filter((item) => {
    return item.id !== req.params.id;
  });
  console.log(filteredCart);
  await cartsRepo.update(req.session.cartId, { items: filteredCart });
});

module.exports = router;
