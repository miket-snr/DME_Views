app.factory("Data", ['$http', '$localStorage','toaster',
    function ($http, $localStorage, toaster) { // This service connects to our REST API

        var serviceBase = './api/v1/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.persist = function(dataobj){
        var lclobj = dataobj ;    
         $localStorage.auths = lclobj.auths ;  
         $localStorage.user = lclobj.user ;   
         $localStorage.company = lclobj.company ;
        } ;
         obj.auths = $localStorage.auths || {token:'',authcodes:[]};
         obj.user = $localStorage.user || {email:'',password:'',name:'',phone:'',company:''};
         obj.company = $localStorage.company || {company:'',coname:'',phone:'',area:''} ;
        return obj;
}]);