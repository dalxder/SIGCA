    var myIcon = L.icon({
    iconUrl: "https://image.flaticon.com/icons/svg/181/181508.svg",
    iconSize: [10, 10]
});
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
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

    
