require.config({
    baseUrl: 'wise5/',
    waitSeconds: 0,
    paths: {
        'angular': [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.3.20/angular.min',
            'vendor/angular/angular.min'
        ],
        'angularAnimate': 'vendor/angular-animate/angular-animate.min',
        'angularAria': 'vendor/angular-aria/angular-aria.min',
        'angularAudio': 'vendor/angular-audio/app/angular.audio',
        'angularDragDrop': 'vendor/angular-dragdrop/src/angular-dragdrop.min',
        'angularFileUpload': 'vendor/ng-file-upload/ng-file-upload.min',
        'angularMaterial': 'vendor/angular-material/angular-material.min',
        'angularMoment': 'vendor/angular-moment/angular-moment.min',
        'angularSanitize': 'vendor/angular-sanitize/angular-sanitize.min',
        'angularSortable': 'vendor/angular-ui-sortable/sortable.min',
        'angularToArrayFilter': 'vendor/angular-toArrayFilter/toArrayFilter',
        'angularUIRouter': 'vendor/angular-ui-router/release/angular-ui-router.min',
        'angularUITinymce': 'vendor/angular-ui-tinymce/src/tinymce',
        'angularUITree': 'vendor/angular-ui-tree/dist/angular-ui-tree.min',
        'angularWebSocket': 'vendor/angular-websocket/angular-websocket.min',
        'annotationController': 'controllers/annotationController',
        'annotationService': 'services/annotationService',
        'app': 'classroomMonitor/app',
        'audioRecorderController': 'components/audioRecorder/audioRecorderController',
        'audioRecorderService': 'components/audioRecorder/audioRecorderService',
        'bootstrap': [ // TODO: remove once no longer using
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min',
            'lib/bootstrap/bootstrap.min'
        ],
        'classroomMonitorController': 'classroomMonitor/classroomMonitorController',
        'configService': 'services/configService',
        'cRaterController': 'components/cRater/cRaterController',
        'cRaterService': 'components/cRater/cRaterService',
        'd3': 'lib/d3/d3',
        'drawingTool': 'lib/drawingTool/drawing-tool',
        'vendor': 'lib/drawingTool/vendor',
        'directives': 'directives/directives',
        'discussionController': 'components/discussion/discussionController',
        'discussionService': 'components/discussion/discussionService',
        'draggablePoints': 'vendor/draggable-points/draggable-points',
        'drawController': 'components/draw/drawController',
        'drawService': 'components/draw/drawService',
        'embeddedController': 'components/embedded/embeddedController',
        'embeddedService': 'components/embedded/embeddedService',
        'filters': 'filters/filters',
        'graphController': 'components/graph/graphController',
        'graphService': 'components/graph/graphService',
        'highcharts': 'vendor/highcharts/highcharts',
        'highcharts-more': 'vendor/highcharts/highcharts-more',
        'highcharts-ng': 'vendor/highcharts-ng/dist/highcharts-ng.min',
        'htmlController': 'components/html/htmlController',
        'htmlService': 'components/html/htmlService',
        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min',
            'vendor/jquery/dist/jquery.min'
        ],
        'jqueryUI': [ // TODO: switch to pared down custom build
            '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
            'vendor/jquery-ui/jquery-ui.min'
        ],
        'matchController': 'components/match/matchController',
        'matchService': 'components/match/matchService',
        'moment': 'vendor/moment/min/moment.min',
        'multipleChoiceController': 'components/multipleChoice/multipleChoiceController',
        'multipleChoiceService': 'components/multipleChoice/multipleChoiceService',
        'navigationController': 'vle/navigation/navigationController',
        'nodeController': 'node/nodeController',
        'nodeGradingController': 'classroomMonitor/nodeGrading/nodeGradingController',
        'nodeProgressController': 'classroomMonitor/nodeProgress/nodeProgressController',
        'nodeService': 'services/nodeService',
        'ocLazyLoad': 'vendor/oclazyload/dist/ocLazyLoad.require',
        'openResponseController': 'components/openResponse/openResponseController',
        'openResponseService': 'components/openResponse/openResponseService',
        'outsideURLController': 'components/outsideURL/outsideURLController',
        'outsideURLService': 'components/outsideURL/outsideURLService',
        'photoBoothController': 'components/photoBooth/photoBoothController',
        'photoBoothService': 'components/photoBooth/photoBoothService',
        'planningController': 'components/planning/planningController',
        'planningService': 'components/planning/planningService',
        'notebook': 'vle/notebook/notebook',
        //'notebookController': 'vle/notebook/notebookController',
        'notebookService': 'services/notebookService',
        'projectService': 'services/projectService',
        'sessionService': 'services/sessionService',
        'studentAssetService': 'services/studentAssetService',
        'studentDataService': 'services/studentDataService',
        'studentGradingController': 'classroomMonitor/studentGrading/studentGradingController',
        'studentProgressController': 'classroomMonitor/studentProgress/studentProgressController',
        'studentStatusService': 'services/studentStatusService',
        'studentWebSocketService': 'services/studentWebSocketService',
        'tableController': 'components/table/tableController',
        'tableService': 'components/table/tableService',
        'teacherDataService': 'services/teacherDataService',
        'teacherWebSocketService': 'services/teacherWebSocketService',
        'tinymce': 'vendor/tinymce-dist/tinymce.min',
        'utilService': 'services/utilService',
        'vleController': 'vle/vleController',
        'webfont': [
            '//ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont',
            'vendor/webfontloader/webfontloader'
        ],
        'webfonts': 'js/webfonts'
    },
    shim: {
        'angular': {
            'exports': 'angular',
            'deps': [
                'jquery'
            ]
        },
        'angularAnimate': {
            'exports': 'angularAnimate',
            'deps': [
                'angular'
            ]
        },
        'angularAria': {
            'exports': 'angularAria',
            'deps': [
                'angular'
            ]
        },
        'angularAudio': {
            'exports': 'angularAudio',
            'deps': [
                'angular'
            ]
        },
        'angularDragDrop': {
            'exports': 'angularDragDrop',
            'deps': [
                'angular'
            ]
        },
        'angularFileUpload': {
            'exports': 'angularFileUpload',
            'deps': [
                'angular'
            ]
        },
        'angularMaterial': {
            'exports': 'angularMaterial',
            'deps': [
                'angularAnimate',
                'angularAria'
            ]
        },
        'angularMoment': {
            'exports': 'angularMoment',
            'deps': [
                'angular',
                'moment'
            ]
        },
        'angularSanitize': {
            'exports': 'angularSanitize',
            'deps': [
                'angular'
            ]
        },
        'angularSortable': {
            'exports': 'angularSortable',
            'deps': [
                'angular'
            ]
        },
        'angularToArrayFilter': {
            'exports': 'angularToArrayFilter',
            'deps': [
                'angular'
            ]
        },
        'angularUIRouter': {
            'exports': 'angularUIRouter',
            'deps': [
                'angular'
            ]
        },
        'angularUITinymce': {
            'exports': 'angularUITinymce',
            'deps': [
                'tinymce',
                'angular'
            ]
        },
        'angularUITree': {
            'exports': 'angularUITree',
            'deps': [
                'angular'
            ]
        },
        'angularWebSocket': {
            'exports': 'angularWebSocket',
            'deps': [
                'angular'
            ]
        },
        'bootstrap': {
            'exports': 'bootstrap',
            'deps': [
                'jquery'
            ]
        },
        'draggablePoints': {
            'exports': 'draggablePoints',
            'deps': [
                'angular',
                'highcharts'
            ]
        },
        'drawingTool': {
            'exports': 'drawingTool',
            'deps': [
                'vendor'
            ]
        },
        'vendor': {
            'exports': 'vendor'
        },
        'highcharts': {
            'exports': 'highcharts',
            'deps': [
                'angular',
                'jquery'
            ]
        },
        'highcharts-more': {
            'exports': 'highcharts-more',
            'deps': [
                'angular',
                'highcharts'
            ]
        },
        'highcharts-ng': {
            'exports': 'highcharts-ng',
            'deps': [
                'angular',
                'highcharts'
            ]
        },
        'jquery': {
            'exports': 'jquery'
        },
        'jqueryUI': {
            'exports': 'jqueryUI',
            'deps': [
                'jquery'
            ]
        },
        'moment': {
            'exports': 'moment'
        },
        'ocLazyLoad': {
            'expports': 'ocLazyLoad',
            'deps': [
                'angular'
            ]
        },
        'tinymce': {
            'exports': 'tinymce'
        },
        'webfont': {
            'exports': 'webfont'
        },
        'webfonts': {
            'exports': 'webfonts',
            'deps': [
                'webfont'
            ]
        }
    }
});
require(['app'],function(app){
    app.init();
});