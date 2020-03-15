const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = (errors) => {
	return layout({
		content : `	<div>
				<label>Sign In</label>
				<form method="POST">
					<input name="email" type="text" placeholder="Email">
					${getError(errors, 'email')}
					<input name="password" type="password" placeholder="Password">
					${getError(errors, 'password')}
					<button>Sign In</button>
				</form>
			</div>`
	});
};
