exports.makeNewQuotation = () => {
	let id = null;
	let items = new Map();
	return Object.freeze({
		get id() {
			return id;
		},
		set id(anId) {
			id = anId;
		},
		get items() {
			return items;
		},
		addItem(item) {
			if (!items.has(item)) {
				items.set(item, 0);
			}
			let quantity = items.get(item);
			quantity += 1;
			items.set(item, quantity);
		}
	});
};