var map;

function initialize() {
	var latlng = new google.maps.LatLng(52.376, 9.762);
	var options = {
		zoom: 11,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
};

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
	var R = 6378.137; // Radius of earth in KM
	var dLat = (lat2 - lat1) * Math.PI / 180;
	var dLon = (lon2 - lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
	Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d * 1000; // meters
}


	map = new google.maps.Map(document.getElementById("map_canvas"), options);

	var mapCanvas = document.getElementById('map_canvas'),
		mapWidth = document.querySelector('.mapWidth'),
		mapHeight = document.querySelector('.mapHeight');

	mapWidth.addEventListener('change', function() {
		mapCanvas.style.width = this.value + "px";
		initialize();
	});

	mapHeight.addEventListener('change', function() {
		mapCanvas.style.height = this.value + "px";
		initialize();
	});


document.querySelector("#getCoords").addEventListener("click", function () {
	var center = map.getCenter(),
		ne = (map.getBounds().getNorthEast()),
		sw =(map.getBounds().getSouthWest()),
		width = measure(ne.lat(), ne.lng(), ne.lat(), sw.lng()),
		height = measure(ne.lat(), ne.lng(), sw.lat(), ne.lng()),
		data = ("Zentrum: " + center + "<br>West-Ost: " + Math.round(width) + "<br>Nord-Süd: " + Math.round(height));

	document.querySelector('.coords').innerHTML = data;

});

}