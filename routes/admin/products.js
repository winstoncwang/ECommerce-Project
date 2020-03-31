const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const productsNewTemp = require('../../views/admin/products/new');
const productsIndexTemp = require('../../views/admin/products/index');
const { requireTitle, requirePrice } = require('./validators');
const { errorHandler } = require('./middlewares');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); //large files will consume alot of memory storage

router.get('/admin/products', async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemp({ products }));
});

router.get('/admin/products/new', (req, res) => {
	res.send(productsNewTemp({}));
});

/*  
	custom validator and multer parser need to change place.
	
	Having upload(multer middleware) used replaces bodyparser's function.

	Hence the validator appearing before multer middleware will validate 
	empty key to produce invalid value.

	Multer middleware also produced parsed key value pair, so having
	validation after upload.single will be the right setup.
*/

router.post(
	'/admin/products/new',
	upload.single('image'),
	[ requireTitle, requirePrice ],
	errorHandler(productsNewTemp),
	async (req, res) => {
		const image = req.file.buffer.toString('base64'); //enconding the buffer info. its safer than raw info. but not product ready.
		const { title, price } = req.body;
		await productsRepo.create({ title, price, image });

		res.redirect('/admin/products');
	}
);

module.exports = router;
