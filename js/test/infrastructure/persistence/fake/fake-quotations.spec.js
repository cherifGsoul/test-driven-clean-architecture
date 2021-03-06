const { expect } = require("chai");
const { makeNewQuotation } = require("../../../../lib/domain/quotation");
const quotations = require("../../../../lib/infrastructure/persistence/fake/fake-quotations");

describe('Fake quotations repository', () => {
	afterEach(() => {
		quotations.clear();
	});
	it('identifies a quotation', async() => {
		const quotation = makeNewQuotation();
		await quotations.add(quotation);
		expect(quotation.id).to.be.not.null;
	});

	it('finds a persisted quotation', async () => {
		const quotation = makeNewQuotation();
		await quotations.add(quotation);
		const persisted = await quotations.get(quotation.id);
		expect(quotation).to.deep.eq(persisted);
	});

	it('modifies an updated quotations', async () => {
		const quotation = makeNewQuotation();
		await quotations.add(quotation);
		quotation.addItem('FOO');
		await quotations.update(quotation);
		const updated = await quotations.get(quotation.id);
		expect(updated).to.deep.equals(quotation);
	});
});