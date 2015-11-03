// Code goes here

// define angular module/app
var formApp = angular.module('formApp', ['AdalAngular', 'ngRoute']);

formApp.config(['$httpProvider', 'adalAuthenticationServiceProvider', '$routeProvider','$locationProvider',
    function ($httpProvider, adalAuthenticationServiceProvider, $routeProvider,$locationProvider) {

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
                    clientId: 'e10a512d-d3b6-4a8d-8a71-05096b226bac',
                    //cacheLocation: 'localStorage',
                    redirectUri: "https://hookmeup.azurewebsites.net/authUser"
                },
                    $httpProvider
                );
    }]);


// create angular controller and pass in $scope and $http
    formApp.controller('formController', ['$scope', '$http',
    function ($scope, $http) {
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
                        "UAT",
                        "Production"];
        }

        else if ($scope.user === "Abhishek Guha") {
            $scope.environments =
                    [
                        "Dev",
                        "QA"];
        };

        // process the form
        $scope.processForm = function () {
            write = 'Environment: ' + $scope.formData.env + '\n' +
                     'Branch: ' + $scope.formData.Branch + '\n' +
                     'Email: ' + $scope.formData.EmailAlias + '\n' +
                     'User: ' + $scope.formData.user + '\nDo you want to continue?';

            console.log(write);
            if (confirm(write)) {
                // do things if OK

                // Send POST to webhook
                $.ajax('https://s1events.azure-automation.net/webhooks?token=p77mF3o9Maf4Ldk6UKY3oPNP5eacOV5AYZV3rwUjpJ4%3d',
                {
                    dataType: "json",
                    type: "POST",
                    data: $scope.formData
                });

                $scope.formData = {};
                $scope.submitmsg = "You have successfullly submitted a build request."
            }
            // else { alert('Aborted') }
        };
    } ]);



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
 