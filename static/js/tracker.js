$(function () {
	var $tracker = $('.js-tracking-percents');

	$tracker.on('mousemove', function (e) {
		var offset = $tracker.offset();
		var height = $tracker.height();
		var width = $tracker.width();

		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var xPersent = (x / width).toFixed(6);
		var yPersent = (y / height).toFixed(6);

		console.log(xPersent, yPersent)
	})
});