exports.makeProductsRouter = (listQuotationItems) => {
	return async (req, res) => {
		const quotationId = req.session.quotationId;
		const quotation = quotationId ? await listQuotationItems(quotationId) : null;
		res.render('index', {
			quotation: quotation
		});
	}
};

exports.makeAddItem = (newQuotation, addQuotationItem) => {
	return async(req, res) => {
		const {item} = req.body;

		let quotationId = req.session.quotationId;

		if (!quotationId) {
			quotationId = await newQuotation();
			req.session.quotationId = quotationId;
		}
		await addQuotationItem(quotationId, item);
		res.redirect('/quotation/products');
	};
};