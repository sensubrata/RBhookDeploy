// Code goes here

// define angular module/app
var formApp = angular.module('formApp', ['AdalAngular', 'ngRoute']);

formApp.config(['$httpProvider', 'adalAuthenticationServiceProvider', '$routeProvider', '$locationProvider',
    function ($httpProvider, adalAuthenticationServiceProvider, $routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'loginController'
            })
            .when('/authUser', {
                templateUrl: 'views/authUser.html',
                controller: 'formController',
                requireADLogin: true
            })
            .otherwise({redirectTo: '/authUser'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        adalAuthenticationServiceProvider.init(
            {
                //tenant: 'adb017fc-41a8-4204-8e40-8d4993adaf32',
                clientId: 'clientId99',
                //cacheLocation: 'localStorage',
                redirectUri: "redirectUri99"
            },
            $httpProvider
        );
    }]);


// create angular controller and pass in $scope and $http
formApp.controller('formController', ['$scope', '$http',
    function ($scope) {
        // create a blank object to hold our form information
        // $scope will allow this to pass between controller and view
        console.log("Controller loaded");
        $scope.formData = {};
        var write = '';

        if ($scope.userInfo.isAuthenticated) {
            $scope.user = $scope.userInfo.profile.name;
            console.log("Login success : " + $scope.userInfo.profile.name);
        }

        console.log("hey.....................");
        //console.log(typeof adalAuthenticationService.userInfo.profile);
        console.log($scope.user);

        $scope.formData.user = $scope.user;
        if ($scope.user === "Subrata Sen" || $scope.user === "Santanu De" || $scope.user === "Bill Wilder") {
            $scope.environments =
                [
                    "Dev",
                    "QA",
                    "UAT1 NCUS",
                    "Prod NCUS",
                    "UAT2 NEUR",
                    "UAT1 NEUR",
                    "Prod NEUR",
                    "DEV BridgeAPI(INTv2)",
                    "UAT2EU BridgeAPI(INTv2)"];
        }

        else if ($scope.user === "Abhishek Guha") {
            $scope.environments =
                [
                    "Dev",
                    "QA",
                    "UAT1 NCUS",
                    "UAT2 NEUR",
                    "UAT1 NEUR",
                    "DEV BridgeAPI(INTv2)",
                    "UAT2EU BridgeAPI(INTv2)"];
        }
        else if ($scope.user === "Nikhil Maskara" || $scope.user === "Hridballav Saha") {
            $scope.environments =
                [
                    "Dev",
                    "DEV BridgeAPI(INTv2)",
                    "UAT2EU BridgeAPI(INTv2)"];
        }
        $scope.change = function () {
            $scope.formData.OnlyConnect = '';
            $scope.formData.Connect = '';
            $scope.formData.Branch = '';
            //console.log('ping')
        };

        // process the form
        $scope.processForm = function () {
            write = 'Environment: ' + $scope.formData.env + '\n' +
            'Branch: ' + $scope.formData.Branch + '\n' +
            'OnlyConnect: ' + $scope.formData.OnlyConnect + '\n' +
            'Connect: ' + $scope.formData.Connect + '\n' +
            'Email: ' + $scope.formData.EmailAlias + '\n' +
            'User: ' + $scope.formData.user + '\nDo you want to continue?';

            console.log(write);
            if (confirm(write)) {
                // do things if OK

                // Send POST to webhook
              if($scope.formData.env === "Dev" || $scope.formData.env === "QA" || $scope.formData.env === "DEV BridgeAPI(INTv2)"){
                $.ajax('webhookURL99',
                    {
                        dataType: "json",
                        type: "POST",
                        data: $scope.formData
                    });
              }else{
                    $.ajax('webhookURL89',
                        {
                            dataType: "json",
                            type: "POST",
                            data: $scope.formData
                        });
               }
                $scope.formData = {};
                $scope.formData.user = $scope.user;
                $scope.submitmsg = "You have successfullly submitted a build request."
            }
            // else { alert('Aborted') }
        };
    }]);


formApp.controller('loginController', ['$scope', 'adalAuthenticationService', '$location',
    function ($scope, adalAuthenticationService, $location) {
        $scope.message = 'Please click Login to proceed';
        $scope.logOut = function () {

            adalAuthenticationService.logOut();
        };

        $scope.logIn = function () {

            adalAuthenticationService.login();
        };
        /*
         if ($scope.userInfo.isAuthenticated) {
         $scope.user = $scope.userInfo.profile.name;
         console.log("Login success : " + $scope.userInfo.profile.name);
         //$location.path('/authUser');
         }
         */
        // Re-route on successful Login
        $scope.$on("adal:loginSuccess", function () {
            //$scope.testMessage = "loginSuccess";
            console.log("Login success : ", $scope.userInfo);

            $location.path('/authUser');

        });

        // optional
        $scope.$on("adal:loginFailure", function () {

        });

        // optional
        $scope.$on("adal:notAuthorized", function (event, rejection, forResource) {
            $scope.testMessage = "It is not Authorized for resource:" + forResource;
        });
    }]);
