function Socket() {
	this.reconnect();
}

Socket.prototype = {
	sendCoordinates: function (x, y) {
		this.socket.send({x: x, y: y}, function (answer) {
			console.log(answer)
		});
	},

	reconnect: function () {
		this.socket && this.socket.close();

		this.socket = io('http://127.0.0.1:3000', {
			transports: ['websocket']
		});

		this.socket.on('connect', function () {
		});

		this.socket.on('disconnect', function () {
			this.reconnect();
		}.bind(this));
	}
};


$(function () {
	var $tracker = $('.js-tracking-percents');
	var socket = new Socket();

	$tracker.on('mousemove', function (e) {
		var offset = $tracker.offset();
		var height = $tracker.height();
		var width = $tracker.width();

		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var xPersent = (x / width).toFixed(6);
		var yPersent = (y / height).toFixed(6);


		socket.sendCoordinates(xPersent, yPersent)
	})
});