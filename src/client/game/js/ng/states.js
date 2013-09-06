// game state / workflow
IronbaneApp
.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
        function($stateProvider, $locationProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);

            //$urlRouterProvider.otherwise('/');

            // state machine router (since game doesn't have url routing)
            $stateProvider
                // root state
                .state('mainMenu', {
                    templateUrl: '/game/templates/mainMenu.html',
                    controller: ['$scope', '$state', '$log',
                        function($scope, $state, $log) {
                            // if not logged in goto mainMenu.login
                            // if logged in goto charselect
                            $state.go('mainMenu.unauthenticated');
                        }
                    ]
                })
                .state('mainMenu.unauthenticated', {
                    templateUrl: '/game/templates/login1.html',
                    controller: ['$scope', '$state', '$log', function($scope, $state, $log) {
                        $scope.guestPlay = function() {

                        };

                        $scope.login = function() {
                            $state.go('mainMenu.login');
                        };

                        $scope.register = function() {
                            $state.go('mainMenu.register');
                        };
                    }]
                })
                .state('mainMenu.login', {
                    templateUrl: '/game/templates/login.html',
                    controller: ['$scope', '$state', '$log', function($scope, $state, $log) {
                        $scope.login = function() {
                            // if all goes well during login, move to character select
                            $state.go('mainMenu.charSelect');
                        };

                        $scope.cancel = function() {
                            // back we go!
                            $state.go('mainMenu.unauthenticated');
                        };
                    }]
                })
                .state('mainMenu.register', {
                    templateUrl: '/game/templates/register.html',
                    controller: ['$scope', '$state', '$log', function($scope, $state, $log) {
                        $scope.cancel = function() {
                            $state.go('mainMenu.unauthenticated');
                        };

                        $scope.register = function() {
                            // do the reg stuff... then on to char select
                            $state.go('mainMenu.charSelect');
                        };
                    }]
                })
                .state('mainMenu.charSelect', {
                    templateUrl: '/game/templates/charSelect.html',
                    controller: 'CharSelectCtrl'
                })
                .state('loading', {
                    url: '/',
                    template: '<div loading-bar fake="isProduction" messages="loadingMessages" message-index="$state.current.data.messageIndex"></div>',
                    data: {
                        messageIndex: 0
                    },
                    controller: ['$scope', '$state', 'funnyLoads', '$window', function($scope, $state, funnyLoads, $window) {
                        var devMessages = [
                            'Loading Terrain',
                            'Loading Cells',
                            'Loading Music',
                            'Loading Area'
                        ];

                        funnyLoads.unshift('Loading');
                        devMessages.unshift('Loading');

                        $scope.isProduction = $window.isProduction;
                        $scope.loadingMessages = $scope.isProduction ? funnyLoads : devMessages;
                    }]
                })
                .state('loading.terrain', {
                    data: {
                        messageIndex: 1
                    }
                })
                .state('loading.cells', {
                    data: {
                        messageIndex: 2
                    }
                })
                .state('loading.music', {
                    data: {
                        messageIndex: 3
                    }
                })
                .state('loading.area', {
                    data: {
                        messageIndex: 4
                    }
                })
                .state('playing', {
                    template: '<p>playing the game!</p>'
                });
        }
    ])
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
                // to active whenever 'contacts.list' or one of its decendents is active.
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);