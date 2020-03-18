const express = require('express');

//express middleware bodyparser to read buffer info
const bodyParser = require('body-parser');
//adding in cookies to ensure server knows the right user by validating id
const cookieSession = require('cookie-session');
//subrouter/middleware for our authentication
const authRouter = require('./routes/admin/auth');

const app = express();

//express middleware that looks into public folder and make everything available.
app.use(express.static('public'));
//parses the buffer info from RESTAPI and parse the data, push into req.body
app.use(bodyParser.urlencoded({ extended: true }));
//middleware that deals with cookiesession. which is used to identify user and ensure the right
//person is signed in/out
app.use(
	cookieSession({
		keys : [ 'asdasds' ]
	})
);
//middle of express.Router, subrouter imported from auth.js
app.use(authRouter);

app.listen(3000, () => {
	console.log('listening');
});
