const layout = require('../layout');

module.exports = () => {
	return layout({
		content : `	<div>
				<label>Sign In</label>
				<form method="POST">
					<input name="email" type="text" placeholder="Email">
					<input name="password" type="password" placeholder="Password">
					<button>Sign In</button>
				</form>
			</div>`
	});
};