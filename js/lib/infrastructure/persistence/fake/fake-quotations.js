const quotations = new Map();

exports.add = (quotation) => {
	return new Promise((resolve, reject) => {
		return setTimeout(() => {
			const key = quotations.size;
			quotation.id = key;
			quotations.set(key, quotation);
			resolve(quotation);
		}, 200);
	});
};

exports.clear = () => quotations.clear();

exports.get = (quotationId) => {
	return new Promise((resolve, reject) => {
		return setTimeout(() => {
			const quotation = quotations.get(quotationId);
			resolve(quotation);
		}, 200);
	});
	
};

exports.update = (quotation) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			quotations.set(quotation.id, quotation);
			resolve(quotation);
		}, 200);
	})
};