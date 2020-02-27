// const bodyParser = (req, res, next) => {
// 	if (req.method === 'POST') {
// 		req.on('data', (data) => {
// 			const parsedData = data.toString('utf8').split('&');
// 			const formData = {};
// 			parsedData.forEach((string) => {
// 				const [ key, value ] = string.split('=');
// 				formData[key] = value;
// 			});

// 			req.body = formData;
// 			next(); //checks for POST method, if true parse the string and continue with next() function
// 		});
// 	} else {
// 		next(); //else continue with next().
// 	}
// };
