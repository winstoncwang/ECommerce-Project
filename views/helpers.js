module.exports = {
	getError : (errors, prop) => {
		//prop === "email" || "password" || "passwordConfirmation"
		try {
			return errors.mapped()[prop].msg; //many corner cases to consider if using if statements.
		} catch (err) {
			return '';
		}
	}
};
