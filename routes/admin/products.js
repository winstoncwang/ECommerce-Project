const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const productsEditTemp = require('../../views/admin/products/edit');
const productsNewTemp = require('../../views/admin/products/new');
const productsIndexTemp = require('../../views/admin/products/index');
const { requireTitle, requirePrice } = require('./validators');
const { errorHandler, requireAuth } = require('./middlewares');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); //large files will consume alot of memory storage

router.get('/admin/products', requireAuth, async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemp({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
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
	requireAuth,
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

//get method edit page
router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	if (!product) {
		return res.send('Product not found!');
	}

	res.send(productsEditTemp({ product }));
});

//post method edit page
router.post(
	'/admin/products/:id/edit',
	requireAuth,
	upload.single('image'),
	[ requireTitle, requirePrice ],
	errorHandler(productsEditTemp, async (req) => {
		const product = await productsRepo.getOne(req.params.id);
		return product;
	}),
	async (req, res) => {
		const { title, price } = req.body;
		const { image } = req.file.buffer.toString('base64');
		try {
			await productsRepo.update(req.params.id, { title, price, image }); //this could go wrong
		} catch (err) {
			res.send('err');
		}
		res.redirect('/admin/products/');
	}
);

module.exports = router;
