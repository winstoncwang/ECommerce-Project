const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send(`
	<div>
		<label>Sign Up</label>
		<form>
		<input type="text" placeholder="Email">
		<input type="password" placeholder="Password">
		<input type="password" placeholder="Confirmation Password">
		<button>Sign Up</button>
		</form>
	</div>
	`);
});

app.listen(3000, () => {
	console.log('listening');
});
