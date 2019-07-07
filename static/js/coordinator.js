var HOST = 'wss://twitch.poplauhin.ru:443';

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

		this.socket = io(HOST, {
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
	var $last = $('.js-last-click');
	var socket = new Socket();

	$tracker.on('click', function (e) {
		var offset = $tracker.offset();
		var height = $tracker.height();
		var width = $tracker.width();

		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var xPersent = (x / width).toFixed(6);
		var yPersent = (y / height).toFixed(6);

		var px = Math.round(xPersent * 1920);
		var py = Math.round(yPersent * 1080);

		$last.html('Last click: ' + px + ', ' + py + ' | Последний клик: ' + px + ', ' + py)

		socket.sendCoordinates(xPersent, yPersent)
	})
});