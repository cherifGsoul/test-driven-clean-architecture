const { expect } = require("chai");
const { makeQuotation } = require("../../lib/domain/quotation");

describe('quoation', () => {
	it('has null default identity', () => {
		const quotation = makeQuotation();
		expect(quotation.id).to.be.be.null;
	});

	it('should be identified when id is set', () => {
		const quotation = makeQuotation();
		quotation.id = '123';
		expect(quotation.id).to.equals('123');
	});

	it('should list items quantity', () => {
		const quotation = makeQuotation();
		quotation.addItem('KEYBOARD');
		const expected = new Map();
		expected.set('KEYBOARD', 1);
		expect(quotation.items).to.deep.equals(expected);
	});

	it('should aggregate item quantities', () => {
		const quotation = makeQuotation();
		quotation.addItem('MONITOR');
		quotation.addItem('MONITOR');
		const expected = new Map();
		expected.set('MONITOR', 2);
		expect(quotation.items).to.deep.eq(expected);
	});
});