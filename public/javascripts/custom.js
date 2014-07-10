var partylat = 51.560126;
var partylng = -0.078481;

$(function() {

	/* Create map. */
    var partyMap = new google.maps.Map(document.getElementById("party"), {
      zoom: 15,
      center: new google.maps.LatLng(partylat, partylng),
      mapTypeId: google.maps.MapTypeId.ROADMAP            
    });

	showMarkers(partyMap);
	
	
	$(".navigation li a").click(function(e) {
		var $el = $(e.target);
		var target = $el.attr("href");
 		$('html,body').stop().animate({scrollTop: $(target).offset().top}, "slow");
 		e.preventDefault();
	})
	
	
	
	/* Create map. */
    var routeMap = new google.maps.Map(document.getElementById("routeMap"), {
      zoom: 15,
      center: new google.maps.LatLng(partylat, partylng),
      mapTypeId: google.maps.MapTypeId.ROADMAP            
    });

	showHoleMarkers(routeMap);

 	var infoWindow = document.createElement("div");
 	var mouseX = 0;
    var mouseY = 0;
    infoWindow.className = "info-bubble";
    $('.routeMapFrame').append(infoWindow);


	
	


function showMarkers(map){
	var pubMarkerGraphic = new google.maps.MarkerImage("images/icon-pub.png", new google.maps.Size(87, 83), new google.maps.Point(0, 0), new google.maps.Point(15,60))

	var pubMarker = new google.maps.Marker({
  	 position: new google.maps.LatLng(partylat,partylng),
     map: map,
	 // shadow: shadow,
     icon: pubMarkerGraphic,
     title: "The Prince"})
}

function showHoleMarkers(map){
	
	var bounds = new google.maps.LatLngBounds ();
	var pubMarkerGraphic = new google.maps.MarkerImage("images/pub-sign.png", new google.maps.Size(81, 84), new google.maps.Point(0, 0), new google.maps.Point(15,94))
	var holeMarkerGraphic = new google.maps.MarkerImage("images/icon-marker.png", new google.maps.Size(21, 42), new google.maps.Point(0, 0), new google.maps.Point(10,42))


	var pubMarker = new google.maps.Marker({
	  	 position: new google.maps.LatLng(51.542952,-0.079208),
	     map: map,
	     icon: pubMarkerGraphic,
	     title: "The talbot"})
	
	bounds.extend (new google.maps.LatLng (51.542952,-0.079208));


	var holes = [
					{holeNo: 1, name: "Newington Green", lat: 51.551486, lng:-0.085101},
					{holeNo: 2, name: "St. Pauls Shrubbery", lat: 51.547349, lng:-0.089436},
					{holeNo: 3, name: "Canonbury Square", lat: 51.543679, lng:-0.099907},
					{holeNo: 4, name: "Arundel Square", lat: 51.545027, lng:-0.110207},
					{holeNo: 5, name: "Barnsbury Square", lat: 51.541931, lng:-0.110593},
					{holeNo: 6, name: "Gibson Gardens", lat: 51.538488, lng:-0.105658},
					{holeNo: 7, name: "Arlington Square", lat: 51.535872, lng:-0.092354},
					{holeNo: 8, name: "Rosemary Gardens", lat: 51.538248, lng:-0.086989},
					{holeNo: 9, name: "De Beauvoir Square", lat: 51.541184, lng:-0.078793}
				]
	
				
	$.each(holes, function(i, v){
	
		bounds.extend (new google.maps.LatLng (holes[i].lat,holes[i].lng));
		
		var holeMarker = new google.maps.Marker({
		  	 position: new google.maps.LatLng(holes[i].lat,holes[i].lng),
		     map: map,
		     icon: holeMarkerGraphic,
		     title: holes[i].name})
		
		listenMarker(holeMarker, map);
		
	})
	
	function listenMarker(marker, map) {
         //Attach click event to markers with ID to retrieve JSON element for info window content
         google.maps.event.addListener(marker, "click", function (e) {
			
			var markerId = marker.__gm_id - 3;
			
			//add extra class for map pin 8 & 6 to reposition digit 
			if(holes[markerId].holeNo === 8 || holes[markerId].holeNo === 6){
				infoWindow.innerHTML = "<p class='hole-number raise-number'>"+ holes[markerId].holeNo + "</p><p class='hole-name'>"+ holes[markerId].name + "</p>"
				
			}else{
				infoWindow.innerHTML = "<p class='hole-number'>"+ holes[markerId].holeNo + "</p><p class='hole-name'>"+ holes[markerId].name + "</p>"
				
			}
			
			
			var $windowElem = $(infoWindow)

			//unnecessarily complicated code for getting the pixel point off a google map. 
			//I'm sure it made sense to the google engineers at the time
			
			var scale = Math.pow(2, map.getZoom());
				var nw = new google.maps.LatLng(
				    map.getBounds().getNorthEast().lat(),
				    map.getBounds().getSouthWest().lng()
				);
			
				var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
				var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
				var pixelOffset = new google.maps.Point(
				    Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
				    Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
				);
			

             //set X position of window depending on position of pin on map and show window
			$windowElem.css({ 'top': ( pixelOffset.y-130 ), 'left': pixelOffset.x+45, 'display': 'block' , 'position':'absolute'});


         })
     }
    
	
	
	


	map.fitBounds (bounds);
}


})