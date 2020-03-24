const express = require('express');
const { validationResult } = require('express-validator');
const productsRepo = require('../../repositories/products');
const productsNewTemp = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
	res.send(productsNewTemp({}));
});

router.post(
	'/admin/products/new',
	[ requireTitle, requirePrice ],
	(req, res) => {
		const err = validationResult(req);
		console.log(err);
		res.send('sub');
	}
);

module.exports = router;
