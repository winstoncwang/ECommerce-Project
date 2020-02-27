const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/', async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;
	//check email duplication
	const exisitingUser = await usersRepo.getOneBy({ email });
	if (exisitingUser) {
		res.send('Email in use!');
	}
	//check password confirmation
	if (password !== passwordConfirmation) {
		res.send('Password must match');
	}
	//create user
	const newUser = await usersRepo.create({ email, password });

	//store cookie using third party library

	res.send('Account Created!!');
});

app.listen(3000, () => {
	console.log('listening');
});
