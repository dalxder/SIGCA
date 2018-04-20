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
    $.getJSON("https://raw.githubusercontent.com/dalxder/SIGCA/gh-pages/js/EstacionesBasica2018.geojson", function (EstacionesBasica2018) {
        estacionesSIH = L.geoJson(estSIH,{
            filter: filtroTipo,
            pointToLayer: layer,
            onEachFeature:ventanaEmergente });
        var markers = L.markerClusterGroup();
        markers.addLayer(estacionesSIH);
        map.fitBounds(markers.getBounds());
        var estacSIH = L.layerGroup([markers]);

        estacionesBasica2018 = L.geoJson(EstacionesBasica2018,
                {onEachFeature:ventanaEmergente
                });
        var markers2 = L.markerClusterGroup();
        markers2.addLayer(estacionesBasica2018);

        map.fitBounds(markers2.getBounds());
        var estacionesBasica2018_Gr = L.layerGroup([markers2]);

        var capas = {
            'Estaciones SIH': estacSIH,
            'Estaciones Básica 2018': estacionesBasica2018
        };

        L.control.layers(mapasBase, capas).addTo(map);
        L.control.scale().addTo(map);
 // The JavaScript below is new
        $("#others").click(function() {
            map.addLayer(estacSIH)
            map.removeLayer(estacionesBasica2018_Gr )
        });
        $("#cafes").click(function() {
            map.addLayer(estacionesBasica2018_Gr)
            map.removeLayer(estacSIH)
        });
        $("#allbus").click(function() {
            map.addLayer(estacSIH)
            map.addLayer(estacionesBasica2018_Gr )
            });

    });
});
L.easyButton('glyphicon-star', function (btn, map) {
    var chuza = [4.5522, -73.7191];
    map.setView(chuza, 10);
}).addTo(map);

    
