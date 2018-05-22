var app=angular.module("appMenu",[])
.controller("menuCtr",function($scope){
$scope.menu=[{id:"indice",
 href:"index.htm"
  },{id:"docContenido",
  href:"contenido.htm"

  }];
});
