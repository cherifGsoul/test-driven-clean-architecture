const { PrismaClient } = require('@prisma/client');
const { makeNewQuotation } = require('../../../domain/quotation');
const prisma = new PrismaClient();

exports.add = async (quotation) => {
	const items = Array.from(quotation.items, ([item, quantity]) => ({item, quantity}));
	const result = await prisma.quotation.create({
		data: {
			items: items
		}
	});
	quotation.id = result.id;
	return quotation.id;
};

exports.get = async (quotationId) => {
	const record = await prisma.quotation.findUnique({
		where: {
			id: Number(quotationId)
		}
	});
	
	const quotation = makeNewQuotation();
	quotation.id = record.id;
	record.items.forEach((item) => {
		quotation.items.set(item.item, item.quantity);
	});
	return quotation;
};

exports.update = async (quotation) => {
	const items = Array.from(quotation.items, ([item, quantity]) => ({item, quantity}));
	await prisma.quotation.update({
		where: {id: Number(quotation.id)},
		data: {items: items}
	});
};