const { expect } = require("chai");
const { makeAddItem, makeNewQuotation, makeListItems } = require("../../lib/use-cases/quotation-use-cases");
const quotations = require('../../lib/infrastructure/persistence/fake/fake-quotations');

describe('Quotation use cases', () => {
	it('Should add Items', () => {
		const newQuotation = makeNewQuotation(quotations);
		const quotationId = newQuotation();
		const addItem = makeAddItem(quotations);
		addItem(quotationId, 'KEYBOARD');
		const listItems = makeListItems(quotations);
		const items = listItems(quotationId);
		const expected = [{item: 'KEYBOARD', quantity: 1}];
		expect(items).deep.equals(expected);
	});

	it('should aggregate items quantity', () => {
		const newQuotation = makeNewQuotation(quotations);
		const quotationId = newQuotation();
		const addItem = makeAddItem(quotations);
		addItem(quotationId, 'KEYBOARD');
		addItem(quotationId, 'MONITOR');
		addItem(quotationId, 'KEYBOARD');
		const listItems = makeListItems(quotations);
		const items = listItems(quotationId);
		const expected = [
			{item: 'KEYBOARD', quantity: 2}, 
			{item: 'MONITOR', quantity: 1}
		];
		expect(items).deep.equals(expected);
	});
});