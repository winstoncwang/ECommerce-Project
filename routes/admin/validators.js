const usersRepo = require('../../repositories/users');
const { check } = require('express-validator');

module.exports = {
	//SIGN UP VALIDATION
	requireEmail                : check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.custom(async (emailInput) => {
			//check email duplication
			const exisitingUser = await usersRepo.getOneBy({ emailInput });
			if (!exisitingUser) {
				throw new Error('Invalid email');
			}
		}),

	requirePassword             : check('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Must be between 4 and 20 characters long'),

	requirePasswordConfirmation : check('passwordConfirmation')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Must be between 4 and 20 characters long')
		.custom((passwordConfirmation, { req }) => {
			//check password confirmation
			if (req.body.password !== passwordConfirmation) {
				throw new Error('Password must match');
			}
		}),
	//SIGN IN VALIDATION
	requireSignInEmail          : check('email')
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

	requireSignInPassword       : check('password')
		.trim()
		.custom(async (password, { req }) => {
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
};
