const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send(`
	<div>
		<label>Sign Up</label>
		<form method="POST">
		<input name="email" type="text" placeholder="Email">
		<input name="password" type="password" placeholder="Password">
		<input name="passwordConfirmation" type="password" placeholder="Confirmation Password">
		<button>Sign Up</button>
		</form>
	</div>
	`);
});

app.post('/', (req, res) => {
	req.on('data', (data) => {
		const parsedData = data.toString('utf8').split('&');
		const formData = {};
		parsedData.forEach((string) => {
			const [ key, value ] = string.split('=');
			formData[key] = value;
		});

		console.log(formData);
	});
	res.send('Account Created!!');
});

app.listen(3000, () => {
	console.log('listening');
});
