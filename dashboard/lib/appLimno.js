d3.json("datos/Puntos_Limnología.geojson", function(data) {
  
  var xf = crossfilter(data.features);
  var groupname = "puntosLimno";
  var datatableDim = xf.dimension(function(d) {return d;});
  

  //MAPA
  var puntosMap = xf.dimension(function(d) {
    var loc=[d.properties.Latitud,d.properties.Longitud]; 
      //d.geometry.coordinates;
    return loc});
  var puntosMapGroup = puntosMap.group().reduceCount();

  //PIE CHAR fuente
  var typesFuentes = xf.dimension(function(d) { 
    
    return d.properties.Fuente; });
  var typesFuentesGroup = typesFuentes.group().reduceCount();

  var typesBarFuentes = xf.dimension(function(d) { 
    
    return d.properties.Fuente; });
  var typesBarFuentesGroup = typesBarFuentes.group().reduceCount();



  var typesSistema = xf.dimension(function(d) { 
    return d.properties.Sistema; });
  var typesSistemaGroup = typesSistema.group().reduceCount();

  var datatableGroup = datatableDim.group().reduceCount();

//console.log(d.properties);

  // Componentes
  var mymap=dc.leafletMarkerChart("#map",groupname);
  var chartFuente = dc.pieChart("#pieFuente",groupname);
  var chartSitema = dc.pieChart("#pieSistema",groupname);
  var ratingCountChart=dc.barChart("#barFuente",groupname);
  

  mymap.dimension(puntosMap)
  .group(puntosMapGroup)
  //.width("100%")
  //.height("100%")
  //.center([4,-74])
  //.zoom(10)
  .cluster(true)
  .renderPopup(true)
  .filterByArea(true);
  /*
  .valueAccessor(function(kv) {
        return kv.value.count;
  })
  .popup(function(kv,marker) {
        var data1="Ventana emergente de Alerta!!";
        return "<b>Tipo de fuente:</b>: "+kv.value.type + " </br>Ubicación: " + kv.value.geo+
        "<br/><button type='button' onclick='alert("+'"'+data1+'"'+")'>Evento click!</button>";
  })*/

  chartFuente
  .dimension(typesFuentes)
  .group(typesFuentesGroup)
  //.width($("#pie").width()/4)
  //.innerRadius($("#pie").width()/2)
  //.height($("#pie").width()/4)
  .renderLabel(true)
  .renderTitle(true)
  .legend(dc.legend())
  .ordering(function (p) {
      return -p.value;
    });

  chartSitema
  .dimension(typesSistema)
  .group(typesSistemaGroup)
  //.width($("#pie").width()/4)
  //.innerRadius($("#pie").width()/2)
  //.height($("#pie").width()/4)
  .renderLabel(true)
  .renderTitle(true)
  .legend(dc.legend())
  .ordering(function (p) {return -p.value;});

  ratingCountChart
      .width(300)
      .height(180)
      .dimension(typesBarFuentes)
      .group(typesBarFuentesGroup)
      .x(d3.scale.linear().domain([0,7]))
      .elasticY(true)
      .centerBar(true)
      //.barPadding(5)
      .xAxisLabel('cantidad')
      .yAxisLabel('Sistema')
      .margins({top: 10, right: 20, bottom: 50, left: 50});
  ratingCountChart.xAxis().tickValues([0, 1, 2, 3, 4, 5, 6]);

dataTable = dc.dataTable('#data-table',groupname);
   dataTable
      .dimension(datatableDim)
      .group(function (d) { return "<button id='download' type='button'/>Descargar CSV</button>"; })
      .size(100)
      .columns([
        function (d) { return d.properties.Latitud; },
        function (d) { return d.properties.Longitud; },
        function (d) { return d.properties.Fuente; },
        function (d) { return d.properties.Sistema; }

      ])
      //.sortBy(dc.pluck('Fuente'))
      .order(d3.descending)
      .on('renderlet', function (table) {
        // each time table is rendered remove nasty extra row dc.js insists on adding
        table.select('tr.dc-table-group').remove();

        // update map with breweries to match filtered data
       //breweryMarkers.clearLayers();
     });

  dc.renderAll(groupname);  
  //mymap.map().setView([4.4,-74.5], 8);

  myLayout.on('stateChanged', function() {   
      mymap.map().invalidateSize();  
  });

d3.select('#download')
    .on('click', function() {
        var data1 = datatableDim.top(Infinity);
        
        var blob = new Blob([d3.csvFormat(data1)], {type: "text/csv;charset=utf-8"});
        saveAs(blob, 'data.csv');
    });
});

