define(['app'], 
        function(app) {
    app.$controllerProvider.register('VLEController',
            function($scope,
                    $rootScope,
                    $state,
                    $stateParams,
                    ConfigService,
                    NotebookService,
                    ProjectService,
                    NodeService,
                    SessionService,
                    StudentDataService,
                    StudentWebSocketService,
                    $ocLazyLoad) {
        this.mode = 'student';
        this.layoutLogic = ConfigService.layoutLogic;
        this.currentNode = null;
        this.themeLoaded = false;

        this.setLayoutState = function() {
            var layoutState = 'nav'; // default layout state
            var node = StudentDataService.getCurrentNode();

            if(node){
                var id = node.id;
                if (ProjectService.isApplicationNode(id)) {
                    layoutState = 'node';
                } else if (ProjectService.isGroupNode(id)) {
                    layoutState = 'nav';
                }
            }

            this.layoutState = layoutState;
        };

        $scope.$on('currentNodeChanged', angular.bind(this, function(event, args) {
            var previousNode = args.previousNode;
            var currentNode = args.currentNode;
            var currentNode = StudentDataService.getCurrentNode();
            var nodeId = currentNode.id;

            StudentDataService.updateStackHistory(nodeId);
            StudentDataService.updateVisitedNodesHistory(nodeId);
            StudentDataService.updateNodeStatuses();

            this.setLayoutState();

            StudentWebSocketService.sendStudentStatus();
            $state.go('root.vle', {nodeId:nodeId});
        }));

        $scope.$on('componentStudentDataChanged', angular.bind(this, function() {
            StudentDataService.updateNodeStatuses();
        }));

        $scope.$on('nodeClickLocked', angular.bind(this, function(event, args) {
            // should be overriden by theme; TODO: how do we make this the default if theme doesn't override?
            //var lockedNodeId = args.nodeId;
            // TODO JB styling...alert for now. Will need to output reason the node is locked.
            //alert("Node " + lockedNodeId + " is locked right now. Make sure you've completed previous steps.");
        }));

        this.updateLayout = function() {
            if (this.project != null) {
                ProjectService.getProject();
            }
        };

        this.showNavigation = function() {
            this.layoutState = 'nav';
        };
        this.navFilters = ProjectService.getFilters();
        this.navFilter = this.navFilters[0].name;

        this.goHome = function() {
            // save goHome event
            var nodeId = null;
            var componentId = null;
            var componentType = null;
            var category = "Navigation";
            var event = "goHomeButtonClicked";
            var eventData = {};
            StudentDataService.saveVLEEvent(nodeId, componentId, componentType, category, event, eventData);

            $rootScope.$broadcast('goHome');
        };

        this.logOut = function() {
            // save logOut event
            var nodeId = null;
            var componentId = null;
            var componentType = null;
            var category = "Navigation";
            var event = "logOutButtonClicked";
            var eventData = {};
            StudentDataService.saveVLEEvent(nodeId, componentId, componentType, category, event, eventData);

            $rootScope.$broadcast('logOut');
        };

        this.layoutLogicStarMap = function(VLEState) {
            if (VLEState.state === 'initial') {
                this.showProjectDiv = true;
                this.showNodeDiv = false;
            } else if (VLEState.state === 'showNavigationClicked') {
                this.showProjectDiv = true;
                this.showNodeDiv = false;
            }
        };

        this.chooseTransition = function(transitions) {
            var transitionResult = null;
            if (transitions != null) {
                for (var t = 0; t < transitions.length; t++) {
                    var transition = transitions[t];
                    var toNodeId = transition.to;
                    if (toNodeId != null) {
                        var toNodeNodeStatus = StudentDataService.getNodeStatusByNodeId(toNodeId);
                        if (toNodeNodeStatus != null && toNodeNodeStatus.isVisitable) {
                            transitionResult = transition;
                            break;
                        }
                    }
                }
            }
            return transitionResult;
        };

        this.notebookDragStartCallback = function(event, ui) {
            console.log('vleController.notebookDragStartCallback');
            //$(ui.helper.context).data('importWorkNodeState', StudentDataService.getLatestNodeStateByNodeId(nodeId));
            //$(ui.helper.context).data('importWorkNodeType', nodeType);
        };

        this.notebookDropCallback = angular.bind(this, function(event, ui) {
            console.log('vleController.notebookDropCallback');
            //var importWorkNodeState = $(ui.helper.context).data('importWorkNodeState');
            //var importWorkNodeType = $(ui.helper.context).data('importWorkNodeType');
            //var populatedNodeState = OpenResponseService.populateNodeState(importWorkNodeState, importWorkNodeType);

            //this.setStudentWork(populatedNodeState);
        });

        var nodeId = null;
        var stateParams = null;
        var stateParamNodeId = null;

        if ($state != null) {
            stateParams = $state.params;
        }

        if (stateParams != null) {
            stateParamNodeId = stateParams.nodeId;
        }

        //var stateParamNodeId = $stateParams.nodeId;
        if (stateParamNodeId != null && stateParamNodeId !== '') {
            nodeId = stateParamNodeId;
        } else {
            var latestComponentState = StudentDataService.getLatestComponentState();

            if (latestComponentState != null) {
                nodeId = latestComponentState.nodeId;
            }
        }

        if (nodeId == null || nodeId === '') {
            nodeId = ProjectService.getStartNodeId();
        }

        this.projectStyle = ProjectService.getStyle();
        this.projectName = ProjectService.getName();

        StudentDataService.setCurrentNodeByNodeId(nodeId);

        this.notebookFilters = NotebookService.getFilters();
        this.notebookFilter = this.notebookFilters[0].name;
        this.notebookOpen = false;

        this.toggleNotebook = function() {
            this.notebookOpen = !this.notebookOpen;
        };

        /**
         * The user has moved the mouse on the page
         */
        this.mouseMoved = function() {
            /*
             * tell the session service a mouse event occurred so it
             * can reset the session timeout timers
             */
            SessionService.mouseEventOccurred();
        };

        // Make sure if we drop something on the page we don't navigate away
        // https://developer.mozilla.org/En/DragDrop/Drag_Operations#drop
        $(document.body).on('dragover', function(e) {
            e.preventDefault();
            return false;
       });

       $(document.body).on('drop', function(e){
            e.preventDefault();
            return false;
        });

        this.theme = ProjectService.getTheme();
        this.themePath = "wise5/vle/themes/" + this.theme;
        var scope = this;
        // load theme module + files
        $ocLazyLoad.load([
            this.themePath + '/theme.js'
        ]).then(function(){
            scope.themeLoaded = true;
            scope.setLayoutState();
            scope.updateLayout();
        });
    });
});