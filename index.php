<?php
if($_SERVER["HTTPS"] != "on")
{
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}
?>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

  <head>
    <meta name="theme-color" content="#317EFB"/>
    <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Jobcard App</title>
          <!-- Bootstrap -->
          <link defer href="./css/bootstrap.min.css" rel="stylesheet">
           <link rel="manifest" href="./manifest.json">
            <link href="./css/custom.css" rel="stylesheet">
              <link href="./css/toaster.css" rel="stylesheet">
               <link rel="icon" type="image/x-icon" href="./favicon.ico" />
                <style>
                  a {
                  color: orange;
                  }
                </style>
                <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
                <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
                <!--[if lt IE 9]><link href= "css/bootstrap-theme.css"rel= "stylesheet" >

<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
              </head>

  <body ng-cloak="">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation" data-ng-controller="authCtrl">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                
                <a class="navbar-brand navbar-image" href="#!/"> <img src="./images/logo.png" /> </a>
            </div> 
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li data-ng-show="auths.token.length > 4"><a class="navbar-brand" ng-href="#!/dashboard">Dashboard</a></li>
                    <li data-ng-show="auths.token.length > 4"><a class="navbar-brand" ng-href="#!/lists">Lists</a></li>
                  <!--  <li data-ng-hide="token"><a class="navbar-brand" ng-href="#/signup">Signup</a></li> -->
                    <li data-ng-show="auths.token.length > 4"><a class="navbar-brand" ng-href="#!/" ng-click="logout()">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>

      <div class="container" style="margin-top:5px;">
                <!-- Page Heading -->
                    
        <ng-view> </ng-view>

      </div>
    </body>
  <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
  <!-- Libs -->
    <script src="./js/Chart.min.js"></script>
    <script src="./js/jquery.min.js"></script>
  <script src="./js/bootstrap.min.js" ></script>
  <script src="./js/angular.min.js"></script>
<!--  <script src="./js/angular-route.min.js"></script>
  <script src="./js/angular-animate.min.js" ></script>-->

<script src="./js/angular-chart.min.js"></script>
  <script src="./js/ngStorage.js"></script>  
  <script src="./js/toaster.js"></script>
  <script src="./app/app.js"></script>
  <script src="./app/data.js"></script>
  <script src="./app/directives.js"></script>
  <script src="./app/authCtrl.js"></script>
</html>

