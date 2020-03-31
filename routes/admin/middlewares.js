const { validationResult } = require('express-validator');

module.exports = {
	errorHandler (templateFunc) {
		//validationResult
		return (req, res, next) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.send(templateFunc({ errors }));

				/*return is necessary here since res.send sends a header to the client notify them 
			there is a error. if you remove the return statement, everything will continue until res.send(sub). This causes error when the
			window for accepting res headers are closed. But server continues with more headers. Hence we have, cannot set headers after
			they are sent to the client (error)*/
			}

			next();
		};
	}
};
