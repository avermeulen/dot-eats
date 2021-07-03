function OrderService() {

	const orders = [];

	function getOrder(id) {
		const order = orders.find(order => order.id === id);
		return order;
	}

	function getOrders() {
		return orders;
	}

	function createOrder(id) {
		if (!getOrder(id)) {
			orders.push({
				id,
				status: 'created'
			});
			return true;
		}
		return false;
	}

	return {
		createOrder,
		getOrders
	};

}
exports.OrderService = OrderService;
