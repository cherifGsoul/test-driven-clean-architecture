const {expect} = require('chai');
const { makeNewQuotation } = require('../../lib/domain/quotation');

describe('Quotation entity', () => {
	beforeEach(() => {
		this.quotation = makeNewQuotation();
	});
	it('has default null identity', () => {
		expect(this.quotation.id).to.be.null;
	});

	it('should have identity when it is set', () => {
		this.quotation.id = '123';
		expect(this.quotation.id).to.equal('123');
	});

	it('should list items quantity', () => {
		this.quotation.addItem('KEYBOARD');
		const expected = new Map();
		expected.set('KEYBOARD', 1);
		expect(this.quotation.items).to.deep.equals(expected);
	});

	it('should aggregate item quantities', () => {
		this.quotation.addItem('MONITOR');
		this.quotation.addItem('MONITOR');
		const expected = new Map();
		expected.set('MONITOR', 2);
		expect(this.quotation.items).to.deep.eq(expected);
	});
});