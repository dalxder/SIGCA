d3.tsv("datos/demo1.tsv", function(data) {
  //drawMarkerSelect(data);
  drawMarkerArea(data);
});
/*     Markers      */
function drawMarkerArea(data) {
  

  var xf = crossfilter(data);
  //var groupname = "puntos";
  var facilities = xf.dimension(function(d) { 
    console.log(d.geo);
    return d.geo; });
  var facilitiesGroup = facilities.group().reduce(
    function(p, v) { // add
      p.geo = v.geo;
      p.type = v.type;
      ++p.count;
      return p;
    },
    function(p, v) { // remove
    --p.count;
    return p;
    },
    function() { // init
    return {count: 0};
    }
    );

//
var width = document.getElementById('pie').offsetWidth;

//

      

var mymap=dc.leafletMarkerChart("#map") //map formatting
      .dimension(facilities)
      .group(facilitiesGroup)
      //.width("100%")
      //.height("100%")
      .center([4,-74])
      .zoom(7)
      .cluster(true)
      .renderPopup(true)
      .valueAccessor(function(kv) {
            return kv.value.count;
      })
      .popup(function(kv,marker) {
            var data1="Ventana emergente de Alerta!!";
            return "<b>Tipo de fuente:</b>: "+kv.value.type + " </br>Ubicación: " + kv.value.geo+
            "<br/><button type='button' onclick='alert("+'"'+data1+'"'+")'>Evento click!</button>";
        }).filterByArea(true);

  var types = xf.dimension(function(d) { return d.type; });
  var typesGroup = types.group().reduceCount();

  var chart = dc.pieChart("#pie");
  //dc.pieChart("#pie",groupname)
      chart
      .dimension(types)
      .group(typesGroup)
      //.width($("#pie").width()/4)
      //.innerRadius($("#pie").width()/2)
      //.height($("#pie").width()/4)
      .renderLabel(true)
      .renderTitle(true)
      .legend(dc.legend())
      .ordering(function (p) {return -p.value;});
//var datatable = dc.dataTable('#datatable');
  
  //

  
/*
  //console.log(mymap.map().invalidateSize());
    var current_position, current_accuracy;

    function onLocationFound(e) {
      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (current_position) {
          map.removeLayer(current_position);
          map.removeLayer(current_accuracy);
      }

      var radius = e.accuracy / 2;

      current_position = L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      current_accuracy = L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
      //map.locate({setView: true, maxZoom: 18});
      alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // wrap map.locate in a function    
    function locate() {
      map.locate({setView: true, maxZoom: 7});
    }
*/
    // call locate every 3 seconds... forever
    //setInterval(locate, 3000);

   
    //var map=mymap.map();
    //mymap.map().invalidateSize();
    //map.setView([4,-74.4]);
     dc.renderAll();
}

