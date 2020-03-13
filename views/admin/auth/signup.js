const layout = require('../layout');

//help functio to see if there is an error
const getError = (errors, prop) => {
	//prop === "email" || "password" || "passwordConfirmation"

	try {
		return errors.mapped()[prop].msg; //many corner cases to consider if using if statements.
	} catch (err) {
		return '';
	}
};

module.exports = ({ req, err }) => {
	return layout({
		content : `	<div>
				<h2>Signed in as ${req.session.userId}.</h2>
				<label>Sign Up Form</label>
				<form method="POST">
					<input name="email" type="text" placeholder="Email">
					${getError(err, 'email')}
					<input name="password" type="password" placeholder="Password">
					${getError(err, 'password')}
					<input name="passwordConfirmation" type="password" placeholder="Confirmation Password">
					${getError(err, 'passwordConfirmation')}
					<button>Sign Up</button>
				</form>
			</div>`
	});
};

/* .mapped() is a express-validator function. check https://express-validator.github.io/docs/validation-result-api.html
error is coverted from array to object:
	[
		{
		  value: 'asds@gmail.com',
		  msg: 'Email in use!',
		  param: 'email',
		  location: 'body'
		},
		{
		  value: '123',
		  msg: 'Invalid value',
		  param: 'password',
		  location: 'body'
		},
		{
		  value: '1234',
		  msg: 'Password must match',
		  param: 'passwordConfirmation',
		  location: 'body'
		}
	]

	  TO:

	{
		email: {
		  value: 'owuej@gmail.com',
		  msg: 'Email in use!',
		  param: 'email',
		  location: 'body'
		},
		password: {
		  value: '',
		  msg: 'Invalid value',
		  param: 'password',
		  location: 'body'
		},
		passwordConfirmation: {
		  value: '',
		  msg: 'Invalid value',
		  param: 'passwordConfirmation',
		  location: 'body'
		}
	} 
	  */
