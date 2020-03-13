const usersRepo = require('../../repositories/users');
const { check } = require('express-validator');

module.exports = {
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
		})
};
