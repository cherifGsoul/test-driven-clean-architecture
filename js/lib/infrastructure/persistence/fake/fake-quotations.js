const QuotationNotFound = require("../../../domain/quotation-not-found");

const quotations = new Map();

exports.add = (quotation) => {
	const id = quotations.size;
	quotation.id = id;
	quotations.set(id, quotation);
};

exports.get = (quotationId) => {
	const quotation = quotations.get(quotationId);
	if (!quotation) {
		throw new QuotationNotFound(`Quotation with ${quotationId} is not found`)
	}
	return quotation;
};