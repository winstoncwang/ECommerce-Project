//require in the users.js from this root
const usersRepo = require('../../repositories/users');
//require in a sub router for the router method to be made available to index.js.
//this is exported and used using app.use
// A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
const express = require('express');
//express middleware for validation
const { check, validationResult } = require('express-validator');
//express middleware subrouter handler
const router = express.Router();
//require in html template
const signupTemp = require('../../views/admin/auth/signup');
const signinTemp = require('../../views/admin/auth/signin');
//custom validator
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirmation,
	requireSignInEmail,
	requireSignInPassword
} = require('./validators');
//custom middleware
const { errorHandler } = require('./middlewares');

//SIGN UP router
router.get('/signup', (req, res) => {
	res.send(signupTemp({}));
});

router.post(
	'/signup',
	[ requireEmail, requirePassword, requirePasswordConfirmation ],
	errorHandler(signupTemp),
	async (req, res) => {
		const { email, password } = req.body;
		//create user
		const newUser = await usersRepo.create({ email, password });

		//store cookie using third party library
		req.session.userId = newUser.id;

		res.redirect('/admin/products');
	}
);

//SIGN OUT
router.get('/signout', (req, res) => {
	req.session = null;
	res.send('You have been logged out sucessfully!');
});

//SIGN IN
router.get('/signin', (req, res) => {
	res.send(signinTemp({}));
});

router.post(
	'/signin',
	[ requireSignInEmail, requireSignInPassword ],
	errorHandler(signinTemp),
	async (req, res) => {
		// //validationResult
		// const err = validationResult(req);
		// console.log(err);
		// if (!err.isEmpty()) {
		// 	return res.send(signinTemp(err));
		// }

		//sign in (essentially manipulating cookies)
		const { email } = req.body;
		const user = usersRepo.getOneBy({ email });
		req.session.userId = user.id;

		res.redirect('/admin/products');
	}
);

module.exports = router;
