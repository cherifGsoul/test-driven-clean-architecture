// ExpressJS composition root of the quotation component
const { 
	makeNewQuotationUseCase, 
	makeAddQuotationItemUseCase, 
	makeListQuotationItems } = require("../lib/use-cases/quotation-use-cases");
	
const quotations = require('../lib/infrastructure/persistence/prisma/prisma-quotations');

const express = require('express');
const { makeProductsRouter, makeAddItem } = require("../lib/infrastructure/web/express/quotation-handlers");
const router = express.Router();

router.get('/products', makeProductsRouter(makeListQuotationItems(quotations)));
router.post('/add-item', makeAddItem(makeNewQuotationUseCase(quotations), makeAddQuotationItemUseCase(quotations)));

module.exports = router;

