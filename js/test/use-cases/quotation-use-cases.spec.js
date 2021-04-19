const {expect} = require('chai');
const quotations = require('../../lib/infrastructure/persistence/fake/fake-quotations');
const { makeNewQuotationUseCase, makeAddQuotationItemUseCase, makeListQuotationItems } = require('../../lib/use-cases/quotation-use-cases');

describe('Quotation use cases', () => {
	describe('add items', () => {
		beforeEach(() => {
			this.quotations = quotations;
			this.newQuotation = makeNewQuotationUseCase(quotations);
			this.addQuotationItem = makeAddQuotationItemUseCase(quotations);
			this.listQuotationItems = makeListQuotationItems(quotations);
			
		});
		afterEach(() => {
			this.quotations.clear();
		});
		it('should add to empty quotation', async() => {
			const quotationId = await this.newQuotation();
			await this.addQuotationItem(quotationId, 'KEYBOARD');
			const items = await this.listQuotationItems(quotationId);
			const expected = [{'item': 'KEYBOARD', 'quantity': 1}];
			expect(items).deep.equal(expected);
		});

		it('should aggregate quantities', async () => {
			const quotationId = await this.newQuotation();
			this.addQuotationItem(quotationId, 'KEYBOARD');
			this.addQuotationItem(quotationId, 'MONITOR');
			this.addQuotationItem(quotationId, 'MONITOR');

			const items = await this.listQuotationItems(quotationId);

			const expected = [{'item': 'KEYBOARD', 'quantity': 1}, {'item': 'MONITOR', 'quantity': 2}];
			expect(items).to.deep.eq(expected);
		});
	});
});