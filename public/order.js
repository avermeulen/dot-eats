document.addEventListener('DOMContentLoaded', function() {

	const socket = io();

	// setTimeout(function() {
	// 	socket.emit('ready:to_order', {});
	// }, 1000);


	const orderFoodBtn = document.querySelector('.orderFood');
	const content = document.querySelector('.content');

	orderFoodBtn.addEventListener('click', function() {
		socket.emit('order:food', {});
	});

	socket.on('order:created', function(data){

		if (data.id == socket.id) {
			content.innerHTML = 'Order created';
		} else {
			content.innerHTML = 'mmm... someone ordered food.';
		}

	});

	socket.on('order:pending', function(){
		content.innerHTML = 'Order pending already';
	});




});