const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const productsNewTemp = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); //large files will consume alot of memory storage

router.get('/admin/products', (req, res) => {});

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
	async (req, res) => {
		const err = validationResult(req);

		if (!err.isEmpty()) {
			res.send(productsNewTemp({ err }));
		}
		const image = req.file.buffer.toString('base64'); //enconding the buffer info. its safer than raw info. but not product ready.
		const { title, price } = req.body;
		await productsRepo.create({ title, price, image });

		res.send('sub');
	}
);

module.exports = router;
