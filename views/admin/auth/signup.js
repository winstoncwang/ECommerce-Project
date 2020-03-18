const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
	return layout({
		content : `
		<div class="container">
		  <div class="columns is-centered">
			<div class="column is-one-quarter">
			  <form method="POST">
				<h1 class="title">Sign Up</h1>
				<div class="field">
				  <label class="label">Email</label>
				  <input required class="input" placeholder="Email" name="email" />
				  <p class="help is-danger">${getError(errors, 'email')}</p>
				</div>
				<div class="field">
				  <label class="label">Password</label>
				  <input required class="input" placeholder="Password" name="password" type="password" />
				  <p class="help is-danger">${getError(errors, 'password')}</p>
				</div>
				<div class="field">
				  <label class="label">Password Confirmation</label>
				  <input required class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
				  <p class="help is-danger">${getError(errors, 'passwordConfirmation')}</p>
				</div>
				<button class="button is-primary">Submit</button>
			  </form>
			  <a href="/signin">Have an account? Sign In</a>
			</div>
		  </div>
		</div>
	  `
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
