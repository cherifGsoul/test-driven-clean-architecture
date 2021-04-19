const { makeQuotation } = require("../domain/quotation");

exports.makeNewQuotation = (quotations) => {
	return () => {
		
		const quotation = makeQuotation();
		quotations.add(quotation);
		return quotation.id;
	};
};
exports.makeAddItem = (quotations) => {
	return (quotationId, item) => {
		const quotation = quotations.get(quotationId);
		quotation.addItem(item);
	};
};

exports.makeListItems = (quotations) => {
	return (quotationId) => {
		const quotation = quotations.get(quotationId);
		const items = quotation.items;
		return Array.from(items, ([item, quantity]) => ({item, quantity}));
	};
}