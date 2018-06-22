var tablaDatos='<div id="main_container" >'+
                '<table class="table table-bordered table-striped" id="data-table" >'+
                    '<thead>'+
                      '<tr class="header">'+
                        '<th>Brewery</th>'+
                        '<th>Beer</th>'+
                        '<th>Style</th>'+
                        '<th>My Rating</th>'+
                        '<th>Community Rating</th>'+
                        '<th>ABV %</th>'+
                        '<th>IBU</th>'+
                      '</tr>'+
                    '</thead>'+
                  '</table>'+
                  '</div>';

var data1='  <div class="row">'+
    '<div class="dc-data-count dc-chart" id="data-count">'+
      '<h2>Beer History'+
        '<small>'+
          '<span class="filter-count"></span> selected out of <span class="total-count"></span> records |'+
           '<a id="all" href="#">Reset All</a>'+
          '</span>'+
        '</small>'+
      '</h2>'+
    '</div>';

var data2='<div class="row">'+
            '<div class="col-xs-6 col-md-3">'+
              '<div class="dc-chart" id="chart-rating-count"></div>'+
            '</div>'+
            '<div class="col-xs-6 col-md-3">'+
              '<div class="dc-chart" id="chart-community-rating-count"></div>'+
            '</div>'+
            '<div class="col-xs-6 col-md-3">'+
              '<div class="dc-chart" id="chart-abv-count"></div>'+
            '</div>'+
            '<div class="col-xs-6 col-md-3">'+
              
            '</div>'+
          '</div>';

var config = {
    content: [{
            type: 'row',
            content: [{
            type: 'column',
            content: [{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data: '<div class="dc-chart" id="chart-ibu-count"></div>'}
                
                },{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data: data2}
                
                },{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data:'<h4>Day <small><a id="day">reset</a></small></h4>'+
                                            '<div id="chart-ring-day" class="dc-chart"></div>'}
                
                }]
            },
            {
            type: 'column',
            content: [{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data:'<div id="map"/>'}
                
                },{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data:'<h4>Year <small><a id="year">reset</a></small></h4>'+
                                            '<div class="dc-chart" id="chart-ring-year"></div>'}
                }

                ]
            },{
            type: 'column',
            content: [{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data: '<div class="dc-chart" id="chart-ibu-count"></div>'+
                 '<h4>Month <small><a id="month" href="#">reset</a></small></h4>'+
                                      '<div class="dc-chart" id="chart-ring-month"></div>'}
                
                },{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data: data1}
                
                },{
                    type: 'component',
                    componentName: 'dashboard',
                    componentState: {data: tablaDatos}
                
                }

                ]
            }]
        }]
};

var myLayout = new GoldenLayout(config);

myLayout.registerComponent('dashboard', function (container, state) {
    container.getElement().html(state.data);

    
    container.on('resize', function(){
        //$("#map").css({"width": "90%", "height": "90%"});

        dc.renderAll();
        console.log(container.getElement());
    });


});



myLayout.init();
