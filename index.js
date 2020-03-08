const express = require('express');

//express middleware bodyparser to read buffer info
const bodyParser = require('body-parser');
//adding in cookies to ensure server knows the right user by validating id
const cookieSession = require('cookie-session');
//subrouter/middleware for our authentication
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys : [ 'asdasds' ]
	})
);
app.use(authRouter);

app.listen(3000, () => {
	console.log('listening');
});
