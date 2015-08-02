console.log("linked");

$(document).ready(function(){

var archives = $('#archives');

displayItem("#project-archives", "ul");
function displayItem (link, item) {
	$(link).click(function(){
		if (!$(this).hasClass("open")) {
			console.log("clicked");
			$(item).slideDown("slow");
			$(this).addClass("open");
		} else {
			$(item).slideUp("slow");
			$(this).removeClass("open");
		}	
	});
}


function initialize() {
	console.log("trying to get map")
	var styles = [
	  {
	    "stylers": [
	      { "hue": "#0022ff" },
	      { "lightness": -6 },
	      { "gamma": 0.97 },
	      { "saturation": 20 }
	    ]
	  }
	]

	var styledMap = new google.maps.StyledMapType(styles,
	{name: "Styled Map"});

	var mapOptions = {
	  center: { lat: 40.688716, lng: -73.941785},
	  zoom: 12
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'),
	    mapOptions);

    map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	var sampleProject = new google.maps.LatLng(40.676089, -73.949423);

	var markerSampleProject = new google.maps.Marker({
	  position: sampleProject,
	  map: map,
	  title: 'Sample Project',
	  url: "sample_project_page.html"
	});

	 var contentString = '<div id="content">'+
	  '<div id="siteNotice">'+
	  '<p>Sample Project</p>' +
	  '<p>Artists, Location, Short description of project<p>' +
	  '</div>'+
	  '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

	google.maps.event.addListener(markerSampleProject, 'mouseover', function(){
		infowindow.open(map,markerSampleProject)
	});

	google.maps.event.addListener(markerSampleProject, 'click', goToPage);

	function goToPage() {
		console.log("clicked");
		window.location.href = this.url;
	}

	google.maps.event.addDomListener(document.getElementById('marker-link'), "click", function(ev) {
		map.setCenter(markerSampleProject.getPosition());
	})

}
google.maps.event.addDomListener(window, 'load', initialize);



});