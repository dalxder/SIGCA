    var myIcon = L.icon({
    iconUrl: "https://image.flaticon.com/icons/svg/181/181508.svg",
    iconSize: [10, 10]
});


var map = L.map('map', {
    center: [4.628211, -74.091638],
    zoom: 13,
    layers: [googleSat]
    ,
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
                        layer.bindPopup(feature.properties.Codigo + '\n "Estación"' + feature.properties.Estacion + ' ' + feature.geometry.coordinates +
                                "#{redireccion.text}");
                    }
                
$.getJSON("https://raw.githubusercontent.com/dalxder/Sih_EAB/master/GeoJson/estaciones_bogota.geojson", function (estSIH) {
    $.getJSON("https://raw.githubusercontent.com/dalxder/Sih_EAB/master/GeoJson/estaciones_bogota.geojson", function (torresEAB_data) {
        estacionesSIH = L.geoJson(estSIH,{
            filter: filtroTipo,
            pointToLayer: layer,
            onEachFeature:ventanaEmergente });
        var markers = L.markerClusterGroup();
        markers.addLayer(estacionesSIH);

        map.fitBounds(markers.getBounds());
        var estacSIH = L.layerGroup([markers]);

        torresEAB = L.geoJson(torresEAB_data,
                {onEachFeature:ventanaEmergente
                });
        var markers2 = L.markerClusterGroup();
        markers2.addLayer(torresEAB);

        map.fitBounds(markers2.getBounds());
        var torresEABgrupo = L.layerGroup([markers2]);

        var capas = {
            'Estaciones SIH': estacSIH,
            'Torres EAB': torresEABgrupo
        };

        L.control.layers(mapasBase, capas).addTo(map);
        L.control.scale().addTo(map);
 // The JavaScript below is new
        $("#others").click(function() {
            map.addLayer(estacSIH)
            map.removeLayer(torresEABgrupo)
        });
        $("#cafes").click(function() {
            map.addLayer(torresEABgrupo)
            map.removeLayer(estacSIH)
        });
        $("#allbus").click(function() {
            map.addLayer(estacSIH)
            map.addLayer(torresEABgrupo)
            });

    });
});
L.easyButton('glyphicon-star', function (btn, map) {
    var chuza = [4.5522, -73.7191];
    map.setView(chuza, 10);
}).addTo(map);

    
