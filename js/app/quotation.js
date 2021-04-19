const { 
	makeNewQuotationUseCase, 
	makeAddQuotationItemUseCase, 
	makeListQuotationItems } = require("../lib/use-cases/quotation-use-cases");
	
const quotations = require('../lib/infrastructure/persistence/prisma/prisma-quotations');

const express = require('express');
const router = express.Router();

const newQuotation = makeNewQuotationUseCase(quotations);
const addQuotationItem = makeAddQuotationItemUseCase(quotations);
const listQuotationItems = makeListQuotationItems(quotations);

router.get('/products', async(req, res) => {
	const quotationId = req.session.quotationId;
	const quotation = quotationId ? await listQuotationItems(quotationId) : null;
	res.render('index', {
		quotation: quotation
	});
});

router.post('/add-item', async (req, res) => {
	const {item} = req.body;
	
	let quotationId = req.session.quotationId;

	if (!quotationId) {
		quotationId = await newQuotation();
		req.session.quotationId = quotationId;
	}
	await addQuotationItem(quotationId, item);
	res.redirect('/quotation/products');
});

module.exports = router;

