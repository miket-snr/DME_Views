app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = Data.user ;
    $scope.auths = Data.auths ;
    $scope.company = Data.company ;
    $scope.doLogin = function (customer) {
        if (customer.email == customer.password){
            $scope.auths.token = '123456';
            $scope.signup.email = customer.email ;
            $scope.signup.name = 'Demo Account' ;
            Data.persist({auths:$scope.auths,user:$scope.signup, company:$scope.company}) ;
          $location.path('dashboard');
        }
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            var lclres = results ;
            Data.toast(results);
            if (lclres.status == "success") {
            $scope.auths.token = lclres.token ;
            $scope.signup.email = lclres.email ;
            $scope.signup.name =  lclres.name ;
            $scope.company.company = lclres.company ;
            Data.persist({auths:$scope.auths,user:$scope.signup, company:$scope.company}) ;        
            $location.path('/lists');
            }
        });
    };
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/lists');
            }
        }).catch(function(data) {
		console.log(data) ;
		});
    };
    
        $scope.upDate = function (customer) {
        var ncust = customer ;
        var ucust = {} ;
        ucust.email = ncust.email;
        ucust.password = ncust.password;
        ucust.company =  ncust.company ;    
        Data.post('upDate', {
            customer: ucust
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/lists');
            }
        }).catch(function(data) {
		console.log(data) ;
		});
    };
    
    $scope.logout = function () {
        Data.auths.token = '';
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('/login');
        });
    };
    $scope.url = $location.path() ;
    if ($scope.auths.token <= ' ') {
         $location.path('/login');
         
     }
});
//***************************************************************************
app.controller('listsCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'Data', function($scope, $rootScope, $routeParams, $location, $http, Data) {
    $scope.newtalk = [] ;    
    $scope.newtalktemp = "" ;
    $scope.filtertx = '';
     $scope.listtype = 'Job' ;
     $scope.btn1year = "Past Year" ;
     $scope.btn60 = "60Days" ;
     $scope.btn30 = "30Days" ;
     $scope.btn14 = "14Days" ;
     $scope.btn7 = "7Days" ;
     $scope.btn0 = "Yesterday" ;
    
     
//***************************     
    $scope.getlisttype = function() {
     if ($scope.listtype == 'Job') {
         $scope.listtype = 'Inv' ;
     } else {
              if ($scope.listtype == 'Inv') {
         $scope.listtype = 'OpenJobs' ;
     } else {
              if ($scope.listtype == 'OpenJobs') {
         $scope.listtype = 'ClosedJobs' ;
        
     } else {
         $scope.listtype = 'Job' ;  
        
     } }
         
     }
     $scope.newtalk = [];
    } ;
//***************************    
 $scope. dateDiffInDays = function(a, b) {
   var _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor( Math.abs(utc2 - utc1) / _MS_PER_DAY);
};
    $scope.getlist = function(days) {
        
    if ($scope.listtype == 'Job') {
    $scope.query = 'jobList?datefrom=' + days ;
    } else {
        if ($scope.listtype == 'Inv') {
            $scope.query = 'invList?datefrom=' + days ;
        }else {
              if ($scope.listtype == 'OpenJobs') {
          $scope.query = 'closedJobList?datefrom=' + days + '&jobstate=open';
     } else {
       $scope.query = 'closedJobList?datefrom=' + days ;  
     } 
        }
        }

     Data.get($scope.query).then(function(data) {
         $scope.newtalk = [] ;
         $scope.newtalktemp = data.replace(/\\/g, "");
         //data.replace(/\\/g, "");
         $scope.newtalk = JSON.parse( $scope.newtalktemp) ;
         $scope.lines = $scope.newtalk.length ;
         if ( $scope.listtype != 'Inv' ) {
             for ( var x = 0 ; x <$scope.lines ; x++ ) {
                 
                var crntdate = 0;
                if ( $scope.newtalk[x].invoice_on > " "){
                   crntdate =  new Date( $scope.newtalk[x].invoice_on.substring(0,10)); 
                } else {
                    crntdate =  new Date();
                }
               var bkdate = new Date( $scope.newtalk[x].datebooked.substring(0,10));
               $scope.newtalk[x].age = $scope.dateDiffInDays(bkdate, crntdate);
             }
         }
     });
     } ;

}]);

//**************************************************************************

app.controller('photoCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'Data', function($scope, $rootScope, $routeParams, $location, $http, Data) {
$scope.readFile = function(file) {                                                       
    var reader = new FileReader();
    reader.onload = readSuccess;                                            
    function readSuccess(evt) {     
        document.getElementById("img_id").src = evt.target.result  ;     
    }
    reader.readAsDataURL(file);                                              
}; 

document.getElementById('cameraInput').onchange = function(e) {
    $scope.readFile(e.srcElement.files[0]);
};


}]);

//***********************************************************
app.controller("LineCtrl",['$scope','Data', function ($scope, Data) {
  
   $scope.labels = [] ;
  $scope.series = [];
  $scope.data  =[] ;
  $scope.query = 'sumList'  ;
  Data.get($scope.query).then(function(data) {   
    
var currentarray = [] ;
var previousarray = [] ;
var arr = [] ;
var newtalktemp = data.replace(/\\/g, "");
         //data.replace(/\\/g, "");
arr = JSON.parse(newtalktemp) ;
var todaysdate = new Date() ;
var strdate = todaysdate.getFullYear() + '-' + ('00' + (todaysdate.getMonth()+1)).slice(-2) + '-00' ;
for (var x = 0 ; x < arr.length; x++) {
 arr[x].Dayno =  parseInt(arr[x].InvDate.slice(-2),10) ;
if ( arr[x].InvDate > strdate ) {
   
   currentarray.push(arr[x]) ;
} else {
   previousarray.push(arr[x]) ;
}
}

previousarray.sort(function(a, b){ if( b.Dayno > a.Dayno ) {return -1 ; } else {return 1;}});
 currentarray.sort(function(a, b){
    if( b.Dayno > a.Dayno ) 
{
    return -1;
} else 
   {  
       return 1;
   }
}
);
var prt = 0.00 ;
var crt = 0.00 ;
var prc = 0 ;
var crc = 0 ;
var pri = 0 ; 
var cri = 0;
var ccn = 0 ; 
var pcn = 0 ;      
      
var dayarray = [] ;
var currentmonth = [];
var lastmonth = [] ;
var currentinv = [];
var lastinv = [] ;
var currentcrn = [];
var lastcrn = [] ;

for (var c=1; c < 32 ; c++) {
    dayarray.push(c) ;
    pri = 0 ; 
    cri = 0;
    ccn = 0 ; pcn = 0 ;
    if (prc < previousarray.length && previousarray[prc].Dayno == (c)){
       prt = prt + Number(previousarray[prc].value );
       pri = previousarray[prc].value ;
       pcn = previousarray[prc].creditvalue ;
       prc++ ;
    }
   if (crc < currentarray.length && currentarray[crc].Dayno == (c)){
       crt = crt +  Number(currentarray[crc].value) ;
       cri = currentarray[crc].value
       ccn = currentarray[crc].creditvalue       
       crc++ ;
    }      
    currentmonth.push(crt);
    lastmonth.push(prt);
    currentinv.push(cri);
    lastinv.push(pri);
    currentcrn.push(ccn) ;
    lastcrn.push(pcn);
    
}
  $scope.mtd = currentmonth[todaysdate.getDate()] ;
  $scope.lmtd = lastmonth[todaysdate.getDate()] ;
  if ($scope.mtd >=  $scope.lmtd ) {
      $scope.progress = 'Yes' ;
      
  } else {
    $scope.progress = 'none' ;
      
  }  
  
  $scope.labels = dayarray ;
  $scope.series = ['Current Jobs','Last Month', 'Current Month'];
  $scope.data = [ dayarray ,
   lastmonth,
   currentmonth
  ];
   $scope.barseries = ['Last Month','Last Credit','Current Credit', 'Current Month'];
  $scope.bardata = [ lastinv,lastcrn,currentcrn, currentinv
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
 
})}]);
//*****************************************

app.controller('racesCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'Data','$timeout','$sce', function($scope, $rootScope, $routeParams, $location, $http, Data,$timeout,$sce) {
$scope.newtalk = "" ;    
$scope.variable = 'We are started' ;
$scope.counter = 1 ;
$scope.trustAsHtml = $sce.trustAsHtml;

 $scope.todos = Data.talk;  

$scope.add2Talk = function(){
    var lclcounter = ++$scope.counter;
    var lclstr = $scope.newtalk.replace(/(?:\r\n|\r|\n)/g, '<br />') ;
    lclstr = lclstr.replace(/\<(?!img|br).*?\>/g, "");
	if (lclstr.length > 2 ) Data.putWeb(lclstr) ;
	$scope.newtalk = "" ;

};	
 $scope.keepon = function() {$timeout( function(){
	       $scope.counter++ ;
           Data.getNext($scope.counter) ;
			
			if ($scope.counter < 10 ) $scope.keepon() ;
        }, 5000 );
 } ;
 $scope.keepon() ;
}]);