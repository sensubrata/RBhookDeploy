angular.bootstrap().invoke(function($http, $timeout){

    $http.get('setup.json').then(function(res){

        // faking ajax latency with $timout
        $timeout(function(){

            // providing the fetched data to the module
            angular.module('formApp').constant('setup', res.data)

            // manual bootstraping
            angular.bootstrap(document,['formApp']);

        },2000)
    })
});