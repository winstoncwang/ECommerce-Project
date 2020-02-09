const express = require('express');

const app = express();

const bodyParser = (req, res, next) => {
	if (req.method === 'POST') {
		req.on('data', (data) => {
			const parsedData = data.toString('utf8').split('&');
			const formData = {};
			parsedData.forEach((string) => {
				const [ key, value ] = string.split('=');
				formData[key] = value;
			});

			req.body = formData;
			next(); //checks for POST method, if true parse the string and continue with next() function
		});
	} else {
		next(); //else continue with next().
	}
};

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
	res.send('Account Created!!');
});

app.listen(3000, () => {
	console.log('listening');
});
