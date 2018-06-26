    var myIcon = L.icon({
    iconUrl: "http://www.acueducto.com.co/wassigue1/storymapfotos/Otros/averde.gif",
    iconSize: [25, 25]
});


var map = L.map('map', {
    center: [4.628211, -74.091638],
    zoom: 13,
    layers: [googleSat],
    fullscreenControl: true,
    // OR
    fullscreenControl: {
        pseudoFullscreen: false // if true, fullscreen to page width and height
    }

});

mapasBase = {
    "OpenTopoMap": OpenTopoMap,
    "OpenStreetMap_Mapnik": OpenStreetMap_Mapnik,
    "OpenStreetMap_BlackAndWhite": OpenStreetMap_BlackAndWhite,
    "Esri_WorldImagery": Esri_WorldImagery,
    "Stamen_Terrain": Stamen_Terrain,
    "googleStreets": googleStreets,
    "googleTerrain": googleTerrain,
    "googleHybrid": googleHybrid,
    "googleSat": googleSat
};

function filtroTipo(feature, layer) {
                return feature.properties.Cat === "PVG"; }
function layer(feature, latlng) {
                        return L.marker(latlng, {
                            icon: myIcon
                        });
                    }

function ventanaEmergente(feature, layer) {
    //COD.  ZONA    CUENCA  NOMBRE DE LA ESTACIÓN   CATEGORIA   TIPO    MUNICIPIO   AUTORIDAD AMBIENTAL Equipamento
    layer.bindPopup('<b>CÓDIGO: ' + feature.properties["COD."] + '</br></b>' + 
                    '<b>NOMBRE DE LA ESTACIÓN:</b> ' + feature.properties["NOMBRE DE LA ESTACIÓN"] +'</BR>'+
                    '<b>ZONA:</b> '+  feature.properties["ZONA"] +'</BR>'+
                    '<b>CUENCA:</b> '+ feature.properties["CUENCA"] +'</BR>'+
                    '<b>CATEGORIA:</b> ' + feature.properties["CATEGORIA"] +'</BR>'+
                    '<b>TIPO:</b> '+ feature.properties["TIPO"] +'</BR>'+
                    '<b>MUNICIPIO:</b> ' +feature.properties["MUNICIPIO"] +'</BR>'+
                    '<b>AUTORIDAD AMBIENTAL:</b> '+ feature.properties["AUTORIDAD AMBIENTAL"] +'</BR>'+
                    '<b>EQUIPAMENTO:</b></br> '+ feature.properties["Equipamento"]);
                    };

function ventanaEmergenteSIH(feature, layer) {
    //COD.	ZONA	CUENCA	NOMBRE DE LA ESTACIÓN	CATEGORIA	TIPO	MUNICIPIO	AUTORIDAD AMBIENTAL	Equipamento
    layer.bindPopup('<b>CÓDIGO: </b>' + feature.properties["Codigo"] + '</br>'+
                    '<b>NOMBRE DE LA ESTACIÓN:</b> ' + feature.properties["Estaci�n"]+'</br>' + 
                    '<b>CATEGORIA: </b> ' + feature.properties["Categor�a"]);
                    };

    var ppTempMeteo = "<b>Código: </b>{COD_ESTACION}</br>"+
    "<b>SUBTIPO</b> {SUBTIPO}</br>"+
    "<b>Código IDEAM: </b>{COD_IDEAM}<br>"+
    "<b>Nombre estación</b>{NOMBREESTACION}<br>"+
    "<b>Estado: </b>{DOMESTADOOPERATIVO}<br>"+
    "<b>Gráfica: </b><a href={URL}>{URL}</a>";
        //       


var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
};

$.getJSON("https://raw.githubusercontent.com/dalxder/SIGCA/gh-pages/js/geoJSON/EstacionesSeriesHidrol%C3%B3gicas.geojson", function (estSIH) {
    $.getJSON("https://raw.githubusercontent.com/dalxder/SIGCA/gh-pages/js/geoJSON/EstacionesBasica2018.geojson", function (EstacionesBasica2018) {
        
/*estaciones SIH series hidrológicas filter: filtroTipo,*/
        estacionesSIH = L.geoJson(estSIH,{
            pointToLayer: layer,
            onEachFeature:ventanaEmergenteSIH });
        var markers = L.markerClusterGroup().addLayer(estacionesSIH);
        map.fitBounds(markers.getBounds());
        var estacSIH = L.layerGroup([markers]);
        
/*estaciones hidrología Básica*/
        estacionesBasica2018 = L.geoJson(EstacionesBasica2018,
                {onEachFeature:ventanaEmergente
                });
        var markers2 = L.markerClusterGroup().addLayer(estacionesBasica2018);
        map.fitBounds(markers2.getBounds());
        var estBasica2018= L.layerGroup([markers2]);

      var meteo=L.esri.Cluster.featureLayer({
    url: 'https://www.acueducto.com.co/wassigue/arcgis/rest/services/EstacionesHidrometeorologicas/MapServer/2',
    //where: "SUBTIPO ='22'",
  pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
    
  
     });
console.log(L.esri.Util.arcgisToGeoJSON(meteo));
      meteo.bindPopup(function(e){
        return L.Util.template(ppTempMeteo, e.feature.properties);
      });
            var capas = {
            'Estaciones SIH': estacSIH,
            'Estaciones Básica 2018': estBasica2018,
            'Meteorologicas':meteo,
        };
        L.control.layers(mapasBase, capas,{position: 'topleft'}).addTo(map); 
        
 // The JavaScript below is new
 /*
        $("#seriesSIH").click(function() {
            map.addLayer(estBasica2018)
            map.removeLayer(estacSIH)
            $(this).css('background-color', 'green'); 
        });
        $("#basica2018").click(function() {

            });*/

$("button").click(function(){
    
    if(this.id=="Todo"){
        $("button").css('background-color','green');
        map.addLayer(estacSIH);
        map.addLayer(estBasica2018 );
        map.addLayer(meteo );
        $(this).css('background-color', 'green'); 
    }
    else{

        if($(this).css("background-color")=="rgb(255, 0, 0)"){
            $(this).css('background-color', 'green');
            if (this.id=="seriesSIH"){map.addLayer(estacSIH);}
            if (this.id=="basica2018"){map.addLayer(estBasica2018);}
            if (this.id=="DITG"){map.addLayer(meteo);}
        }else{ 
            $(this).css('background-color', 'red');
            if (this.id=="seriesSIH"){map.removeLayer(estacSIH);}
            if (this.id=="basica2018"){map.removeLayer(estBasica2018);}
            if (this.id=="DITG"){map.removeLayer(meteo);}
            }
        $("#Todo").css('background-color','red');
    }
}
);

//map state by itself, whereas it does with Leaflet 0.7.x?
map.on("overlayadd overlayremove", function (event) {
    var layer = event.layer;
    if (event.type === "overlayadd") {
            if (layer === meteo){
                $("#DITG").css('background-color', 'green')
            }

    }
    if (event.type === "overlayremove"){
            if (layer === meteo){
                $("#DITG").css('background-color', 'red')
            }
    }

});

    });
});

L.easyButton('glyphicon-star', function (btn, map) {
    var chuza = [4.5522, -73.7191];
    map.setView(chuza, 10);
}).addTo(map);
L.control.scale().addTo(map);


    
