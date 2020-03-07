const layout = require('../layout');

module.exports = ({ req }) => {
	return layout({
		content : `	<div>
				<h2>Signed in as ${req.session.userId}.</h2>
				<label>Sign Up Form</label>
				<form method="POST">
					<input name="email" type="text" placeholder="Email">
					<input name="password" type="password" placeholder="Password">
					<input name="passwordConfirmation" type="password" placeholder="Confirmation Password">
					<button>Sign Up</button>
				</form>
			</div>`
	});
};
