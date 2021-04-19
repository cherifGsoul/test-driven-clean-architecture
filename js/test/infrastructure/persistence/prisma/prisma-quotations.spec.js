const { PrismaClient } = require(".prisma/client");
const { expect } = require("chai");
const { makeNewQuotation } = require("../../../../lib/domain/quotation");
const quotations = require("../../../../lib/infrastructure/persistence/prisma/prisma-quotations");

describe('Prisma quotations', () => {
	beforeEach(() => {
		this.prisma = new PrismaClient();
	});
	it('identifies a quotation', async () => {
		const quotation = makeNewQuotation();
		await quotations.add(quotation);
		expect(quotation.id).to.be.not.null;
		await this.prisma.quotation.deleteMany();
	});

	it('finds a persisted quotation', async () => {
		const quotation = makeNewQuotation();
		await quotations.add(quotation);
		const persisted = await quotations.get(quotation.id);
		expect(quotation.id).to.deep.eq(persisted.id);
		await this.prisma.quotation.deleteMany();
	});

	it('modifies an updated quotations', async () => {
		const quotation = makeNewQuotation();
		await quotations.add(quotation);
		quotation.addItem('FOO');
		await quotations.update(quotation);
		const updated = await quotations.get(quotation.id);
		expect(updated.items).to.deep.equals(quotation.items);
		await this.prisma.quotation.deleteMany();
	});
});