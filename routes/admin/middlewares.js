const { validationResult } = require('express-validator');

module.exports = {
	errorHandler (templateFunc, productCb) {
		//productCd is an async function and need to invoked
		//validationResult
		return async (req, res, next) => {
			const errors = validationResult(req);
			let product = {};

			if (!errors.isEmpty()) {
				if (productCb) {
					product = await productCb(req);
				}
				console.log(product);
				return res.send(templateFunc({ errors, product }));

				/*return is necessary here since res.send sends a header to the client notify them 
			there is a error. if you remove the return statement, everything will continue until res.send(sub). This causes error when the
			window for accepting res headers are closed. But server continues with more headers. Hence we have, cannot set headers after
			they are sent to the client (error)*/
			}

			next();
		};
	},
	requireAuth (req, res, next) {
		if (!req.session.userId) {
			return res.redirect('/signin');
		}

		next();
	}
};
