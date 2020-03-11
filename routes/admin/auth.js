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

//SIGN UP router
router.get('/signup', (req, res) => {
	res.send(signupTemp({ req }));
});

router.post(
	'/signup',
	[
		check('email')
			.trim()
			.normalizeEmail()
			.isEmail()
			.custom(async (emailInput) => {
				//check email duplication
				const exisitingUser = await usersRepo.getOneBy({ emailInput });
				if (!exisitingUser) {
					throw new Error('Email in use!');
				}
			}),
		check('password').trim().isLength({ min: 4, max: 20 }),
		check('passwordConfirmation')
			.trim()
			.isLength({ min: 4, max: 20 })
			.custom((passwordConfirmation, { req }) => {
				//check password confirmation
				if (req.body.password !== passwordConfirmation) {
					throw new Error('Password must match');
				}
			})
	],
	async (req, res) => {
		//validator object
		const err = validationResult(req);
		console.log(err);

		const { email, password, passwordConfirmation } = req.body;

		if (!err) {
			//create user
			const newUser = await usersRepo.create({ email, password });

			//store cookie using third party library
			req.session.userId = newUser.id;

			res.send('Account Created!!');
		}
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

router.post('/signin', async (req, res) => {
	//check for existance of email inside data storage
	const { email, password } = req.body;
	const user = await usersRepo.getOneBy({ email });
	if (!user) {
		res.send('Invalid email, re-enter or sign up');
	}

	//compare password(saved,supplied)
	const passwordCheck = await usersRepo.comparePassword(
		user.password,
		password
	);

	if (!passwordCheck) {
		res.send('Invalid password, please check again.');
	}

	//sign in (essentially manipulating cookies)
	req.session.userId = user.id;
	res.send('You are logged in!');
});

module.exports = router;
