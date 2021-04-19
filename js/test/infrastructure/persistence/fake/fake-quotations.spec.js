const { expect } = require("chai");
const { makeQuotation } = require("../../../../lib/domain/quotation");
const quotations = require('../../../../lib/infrastructure/persistence/fake/fake-quotations');

describe('Fake Quotations', () => {
	it('identifies quotation', () => {
		const quotation = makeQuotation();
		quotations.add(quotation);
		expect(quotation.id).to.not.be.null;
	});

	it('should find a saved quotation', () => {
		const quotation = makeQuotation();
		quotations.add(quotation);
		const presisted = quotations.get(quotation.id);
		expect(quotation).deep.equal(presisted);
	});

	it('should throw when quotation is not found', () => {
		expect(() => quotations.get('INVALID_ID')).to.throw('Quotation with INVALID_ID is not found');
	});
});