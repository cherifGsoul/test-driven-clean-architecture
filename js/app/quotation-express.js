// ExpressJS composition root of the quotation component
const { 
	makeNewQuotationUseCase, 
	makeAddQuotationItemUseCase, 
	makeListQuotationItems } = require("../lib/use-cases/quotation-use-cases");
	
const quotations = require('../lib/infrastructure/persistence/prisma/prisma-quotations');

const express = require('express');
const { makeProductsRouter, makeAddItem } = require("../lib/infrastructure/web/express/quotation-handlers");
const router = express.Router();

const newQuotation = makeNewQuotationUseCase(quotations);
const addQuotationItem = makeAddQuotationItemUseCase(quotations);
const listQuotationItems = makeListQuotationItems(quotations);

router.get('/products', makeProductsRouter(listQuotationItems));
router.post('/add-item', makeAddItem(newQuotation, addQuotationItem));

module.exports = router;

