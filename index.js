const express = require('express');
const path = require('path');
//express middleware bodyparser to read buffer info
const bodyParser = require('body-parser');
//adding in cookies to ensure server knows the right user by validating id
const cookieSession = require('cookie-session');
//subrouter/middleware for our authentication
const authRouter = require('./routes/admin/auth');
//subrouter for product router
const adminProductsRouter = require('./routes/admin/products');
//subrouter for user facing product
const productsRouter = require('./routes/products');
//subrouter for cart product
const cartsRouter = require('./routes/carts');

//heroku bind port
const PORT = process.env.PORT || 5000;

const app = express();

//express middleware that looks into public folder and make everything available.
app.use(express.static(path.join(__dirname, 'public')));
//parses the buffer info from RESTAPI and parse the data, push into req.body
app.use(bodyParser.urlencoded({ extended: true }));
//middleware that deals with cookiesession. which is used to identify user and ensure the right
//person is signed in/out
app.use(
	cookieSession({
		keys : [ 'asdasds' ]
	})
);
//middleware of express.Router, subrouter imported from auth.js
app.use(authRouter);
//middleware of products.js
app.use(adminProductsRouter);
//use product.js user facing
app.use(productsRouter);
//use carts product
app.use(cartsRouter);

app.listen(PORT, () => {
	console.log(`The app is running on port: ${PORT}`);
});
