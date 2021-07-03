document.addEventListener('DOMContentLoaded', function() {
	const socket = io();

	async function getOrders() {
		const result = await fetch('/api/orders');
		const  orders = await result.json();
		content.innerHTML = `${orders.length} order(s) received.`
	}

	getOrders();

	const content = document.querySelector('.content');
	socket.on('order:created', async function() {
		getOrders();
	});

});