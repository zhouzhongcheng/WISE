define([
    'angular',
    'd3',
    'directives',
    'filters',
    'jquery',
    'jqueryUI',
    'angularAnimate',
    'angularDragDrop',
    'angularSortable',
    'angularUIRouter',
    'angularWebSocket',
    'annotationService',
    'configService',
    'cRaterService',
    'currentNodeService',
    'discussionService',
    'drawService',
    'graphService',
    'matchService',
    'multipleChoiceService',
    'nodeService',
    'openResponseService',
    'outsideURLService',
    'photoBoothService',
    'portfolioService',
    'projectService',
    'sessionService',
    'studentDataService',
    'studentStatusService',
    'tableService',
    'teacherDataService',
    'teacherWebSocketService'
], function(
    angular,
    d3,
    directives,
    filters,
    $,
    jqueryUI,
    angularAnimate,
    angularDragDrop,
    angularSortable,
    angularUIRouter,
    angularWebSocket,
    annotationService,
    configService,
    cRaterService,
    currentNodeService,
    discussionService,
    drawService,
    graphService,
    matchService,
    multipleChoiceService,
    nodeService,
    openResponseService,
    outsideURLService,
    photoBoothService,
    portfolioService,
    projectService,
    sessionService,
    studentDataService,
    studentStatusService,
    tableService,
    teacherDataService,
    teacherWebSocketService) {

    var app = angular.module('app', [
        'directives',
        'filters',
        'ui.router',
        'ui.sortable',
        'ngAnimate',
        'ngDragDrop',
        'ngWebSocket'
    ]);

    // core services
    app.factory('AnnotationService', annotationService);
    app.factory('ConfigService', configService);
    app.factory('CRaterService', cRaterService);
    app.factory('CurrentNodeService', currentNodeService);
    app.factory('NodeService', nodeService);
    app.factory('PortfolioService', portfolioService);
    app.factory('ProjectService', projectService);
    app.factory('SessionService', sessionService);
    app.factory('StudentDataService', studentDataService);
    app.factory('StudentStatusService', studentStatusService);
    app.factory('TeacherDataService', teacherDataService);
    app.factory('TeacherWebSocketService', teacherWebSocketService);

    // node services
    app.factory('DiscussionService', discussionService);
    app.factory('DrawService', drawService);
    app.factory('GraphService', graphService);
    app.factory('MatchService', matchService);
    app.factory('MultipleChoiceService', multipleChoiceService);
    app.factory('OpenResponseService', openResponseService);
    app.factory('OutsideURLService', outsideURLService);
    app.factory('PhotoBoothService', photoBoothService);
    app.factory('TableService', tableService);

    app.init = function() {
        angular.bootstrap(document, ['app']);
    };

    app.loadController = function(controllerName) {
        return ['$q', function($q) {
            var deferred = $q.defer();
            require([controllerName], function() {
                deferred.resolve();
            });
            return deferred.promise;
        }];
    };

    app.config(['$urlRouterProvider', '$stateProvider', '$controllerProvider',
        function($urlRouterProvider, $stateProvider, $controllerProvider) {

            $urlRouterProvider.otherwise('/project');

            app.$controllerProvider = $controllerProvider;

            $stateProvider
                .state('root', {
                    url: '',
                    abstract: true,
                    templateUrl: '../../wise5/authoringTool/authoringTool.html',
                    controller: 'AuthoringToolController',
                    controllerAs: 'authoringToolController',
                    resolve: {
                        authoringToolController: app.loadController('authoringToolController'),
                        portfolioController: app.loadController('portfolioController'),
                        config: function(ConfigService) {
                            var configURL = window.configURL;

                            return ConfigService.retrieveConfig(configURL);
                        },
                        project: function(ProjectService, config) {
                            return ProjectService.retrieveProject();
                        }
                    }
                })
                .state('root.project', {
                    url: '/project',
                    templateUrl: '../../wise5/authoringTool/project/project.html',
                    controller: 'ProjectController',
                    controllerAs: 'projectController',
                    resolve: {
                        loadController: app.loadController('projectController')
                    }
                });
            /*
                .state('root.nodeProgress', {
                    url: '/nodeProgress',
                    templateUrl: 'wise5/classroomMonitor/nodeProgress/nodeProgress.html',
                    controller: 'NodeProgressController',
                    controllerAs: 'nodeProgressController',
                    resolve: {
                        loadController: app.loadController('nodeProgressController')
                    }
                })
                .state('root.nodeGrading', {
                    url: '/nodeGrading',
                    templateUrl: 'wise5/classroomMonitor/nodeGrading/nodeGrading.html',
                    controller: 'NodeGradingController',
                    controllerAs: 'nodeGradingController',
                    resolve: {
                        studentData: function(TeacherDataService, config) {
                            return TeacherDataService.retrieveStudentDataByNodeId();
                        },
                        annotations: function(AnnotationService, config) {
                            return AnnotationService.retrieveAnnotationsByNodeId();
                        },
                        loadController: app.loadController('nodeGradingController')
                    }
                })
                .state('root.studentGrading', {
                    url: '/studentGrading/:workgroupId',
                    templateUrl: 'wise5/classroomMonitor/studentGrading/studentGrading.html',
                    controller: 'StudentGradingController',
                    controllerAs: 'studentGradingController',
                    resolve: {
                        studentData: function(TeacherDataService, config) {
                            return TeacherDataService.retrieveStudentDataByNodeId();
                        },
                        annotations: function(AnnotationService, config) {
                            return AnnotationService.retrieveAnnotationsByNodeId();
                        },
                        loadController: app.loadController('studentGradingController')
                    }
                });
                */

        }]);
    return app;
});