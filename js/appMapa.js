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
        
/*estaciones SIH series hidrológicas*/
        estacionesSIH = L.geoJson(estSIH,{
            filter: filtroTipo,
            pointToLayer: layer,
            onEachFeature:ventanaEmergente });
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

        var capas = {
            'Estaciones SIH': estacSIH,
            'Estaciones Básica 2018': estBasica2018
        };
// Agregar Controles de mapa
        L.control.layers(mapasBase, capas).addTo(map);
        L.control.scale().addTo(map);
 // The JavaScript below is new
        $("#others").click(function() {
            map.addLayer(estacSIH)
            map.removeLayer(estBasica2018 )
        });
        $("#cafes").click(function() {
            map.addLayer(estBasica2018)
            map.removeLayer(estacSIH)
        });
        $("#allbus").click(function() {
            map.addLayer(estacSIH)
            map.addLayer(estBasica2018 )
            });

    });
});
L.easyButton('glyphicon-star', function (btn, map) {
    var chuza = [4.5522, -73.7191];
    map.setView(chuza, 10);
}).addTo(map);

    
