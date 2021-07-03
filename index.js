const express =  require('express');
const http = require('http');
const { Server } = require("socket.io");
const { OrderService } = require("./OrderService");

const  app = express ();
const server = http.createServer(app)
const io = new Server(server);

const PORT  = process.env.PORT || 7011;
const routes = Routes();

const orderService = OrderService();

io.on('connection', function(socket) {
	// console.log('user connected', socket.id);

	// socket.on('disconnect', () => {
	// 	console.log('user disconnected');
	// });

	// socket.on('ready:to_order', function() {
	// 	console.log('Customer joined to order');
	// });

	socket.on('ready:to_deliver', function() {
		console.log('Deliverer joined to deliver');
	});

	socket.on('order:food', function() {
		const orderCreated = orderService.createOrder(socket.id);
		if (orderCreated) {
			io.emit('order:created', {
				id: socket.id
			});
		} else {
			io.to(socket.id).emit('order:pending');
		}

	});

});

app.use(express.static('public'))

app.get('/order', routes.order);
app.get('/api/orders', function(req,  res){
	res.json(orderService.getOrders());
})

server.listen(PORT, function() {
	console.log('dotEats started on port: ' + PORT);
});



function Routes() {

	return {

		index(req, res) {
			res.send('dotEats');
		},

		order(req, res) {
			res.send('Order');
		}
	}
}
