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
	requirePasswordConfirmation
} = require('./validators');

//SIGN UP router
router.get('/signup', (req, res) => {
	res.send(signupTemp({ req }));
});

router.post(
	'/signup',
	[ requireEmail, requirePassword, requirePasswordConfirmation ],
	async (req, res) => {
		//validator object
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.send(signupTemp({ req, err }));
		}
		const { email, password } = req.body;
		//create user
		const newUser = await usersRepo.create({ email, password });

		//store cookie using third party library
		req.session.userId = newUser.id;

		res.send('Account Created!!');
	}
);

//SIGN OUT
router.get('/signout', (req, res) => {
	req.session = null;
	res.send('You have been logged out sucessfully!');
});

//SIGN IN
router.get('/signin', (req, res) => {
	res.send(signinTemp());
});

router.post(
	'/signin',
	[
		//check for existance of email inside data storage
		check('email')
			.trim()
			.normalizeEmail()
			.isEmail()
			.withMessage('Must be a valid email.')
			.custom(async (email) => {
				const user = await usersRepo.getOneBy({ email });
				if (!user) {
					throw new Error('Invalid email');
				}
			}),
		check('password').trim().custom(async (password, { req }) => {
			const user = await usersRepo.getOneBy({ email: req.body.email }); // param {object} with key and value pair
			if (!user) {
				throw new Error('Invalid password'); //counter the undefined user case
			}
			//compare password(saved,supplied)
			const passwordCheck = await usersRepo.comparePassword(
				user.password,
				password
			);

			if (!passwordCheck) {
				throw new Error('Invalid password');
			}
		})
	],
	async (req, res) => {
		//validationResult
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			res.send('Errors found');
		}

		//sign in (essentially manipulating cookies)

		// req.session.userId = user.id;
		// res.send('You are logged in!');
	}
);

module.exports = router;
