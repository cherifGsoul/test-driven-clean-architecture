const { makeNewQuotation } = require("../domain/quotation");

exports.makeNewQuotationUseCase = (quotations) => {
	if (!quotations.add || typeof quotations.add !== 'function') {
		throw new TypeError('Quotations repository must have add function');
	}

	return async () => {
		const quotation = makeNewQuotation();
		await quotations.add(quotation);
		return quotation.id;
	};
};

exports.makeAddQuotationItemUseCase = (quotations) => {
	return async (quotationId, item) => {
		const quotation = await quotations.get(quotationId);
		quotation.addItem(item);
		await quotations.update(quotation);
	};
};

exports.makeListQuotationItems = (quotations) => {
	return async (quotationId) => {
		const quotation = await quotations.get(quotationId);
		const items = quotation.items;
		return Array.from(items, ([item, quantity]) => ({item, quantity}));
	};
};