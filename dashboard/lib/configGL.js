var tablaDatos='<div id="main_container" >'+
                '<table class="table table-bordered table-striped" id="data-table" >'+
                    '<thead>'+
                      '<tr class="header">'+
                        '<th>Latitud</th>'+
                        '<th>Longitud</th>'+
                        '<th>Fuente</th>'+
                        '<th>Sistema</th>'+
                      '</tr>'+
                    '</thead>'+
                  '</table>'+
                  '</div>';


var config = {
    settings:{
        hasHeaders: true,
        constrainDragToContainer: true,
        reorderEnabled: true,
        selectionEnabled: false,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: false,
        showMaximiseIcon: true,
        showCloseIcon: false
    },
    content: [{
            type: 'column',
            content: [{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data: '<div id="map"></div>'},
                    isClosable: false,
                    title: 'Mapa'
                    
                }, {
                    type: 'row',
                    content: [{
                            type: 'component',
                            componentName: 'dashboard',
                            componentState: {data: '<div id="pieFuente"></div><div id="barFuente"></div>'},
                            isClosable: false,
                            width:40
                        }, {
                            type: 'component',
                            componentName: 'dashboard',
                            componentState: {data: '<div id="pieSistema"></div>'},
                            isClosable: false
                        },
                        {
                            type: 'component',
                            componentName: 'dashboard',
                            componentState: {data: tablaDatos},
                            isClosable: false,
                            width:35
                        }]
                }]
        }]
};

var myLayout = new GoldenLayout(config);


myLayout.registerComponent('dashboard', function (container, state) {
    container.getElement().html(state.data);
    container.on('resize', function(){
        //L.Map.invalidateSize();
        //$("#map").css({"width": "90%", "height": "90%"});
        //mymap.map().invalidateSize();
        //dc.renderAll(groupname);
    
    });
});

myLayout.init();
//console.log(myLayout.width);



