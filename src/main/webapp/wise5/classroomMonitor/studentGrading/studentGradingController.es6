'use strict';

class StudentGradingController {

    constructor($mdDialog,
                $stateParams,
                AnnotationService,
                ConfigService,
                NotebookService,
                ProjectService,
                TeacherDataService) {

        this.$mdDialog = $mdDialog;
        this.$stateParams = $stateParams;
        this.AnnotationService = AnnotationService;
        this.ConfigService = ConfigService;
        this.NotebookService = NotebookService;
        this.ProjectService = ProjectService;
        this.TeacherDataService = TeacherDataService;

        this.annotationMappings = {};

        this.workgroupId = parseInt(this.$stateParams.workgroupId);

        this.nodeIds = this.ProjectService.getFlattenedProjectAsNodeIds();

        this.branches = this.ProjectService.getBranches();

        this.teacherWorkgroupId = this.ConfigService.getWorkgroupId();
        
        this.canViewStudentNames = true;
        this.canGradeStudentWork = true;
        
        // get the role of the teacher for the run e.g. 'owner', 'write', 'read'
        var role = this.ConfigService.getTeacherRole(this.teacherWorkgroupId);
        
        if (role === 'owner') {
            // the teacher is the owner of the run and has full access
            this.canViewStudentNames = true;
            this.canGradeStudentWork = true;
        } else if (role === 'write') {
            // the teacher is a shared teacher that can grade the student work
            this.canViewStudentNames = true;
            this.canGradeStudentWork = true;
        } else if (role === 'read') {
            // the teacher is a shared teacher that can only view the student work
            this.canViewStudentNames = false;
            this.canGradeStudentWork = false;
        }
        
        if (this.canViewStudentNames) {
            // display the student name
            this.userName = this.ConfigService.getUserNameByWorkgroupId(this.workgroupId);
        } else {
            // do not display the student name. instead display the workgroup id.
            this.userName = this.workgroupId;
        }

        // scroll to the top of the page when the page loads2
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        // save event when student grading view is displayed
        let context = "ClassroomMonitor", nodeId = null, componentId = null, componentType = null,
            category = "Navigation", event = "studentGradingViewDisplayed", data = { workgroupId: this.workgroupId };
        this.TeacherDataService.saveEvent(context, nodeId, componentId, componentType, category, event, data);
    }

    /**
     * Check if we should show the given node id for the student. We will
     * determine whether to show a node id or not by checking to see if
     * the node id is in a branch. If the node id is not in a branch we
     * will show it. If the node id is in a branch, we need to check which
     * branch paths the node id is in. If the node id is in a branch path
     * and the student has work for any node id in the branch path, we will
     * show the node id passed into this function.
     * @param nodeId the node id
     * @return whether to show the node for this student
     */
    showNodeIdForStudent(nodeId) {
        var result = false;

        if (this.ProjectService.isNodeIdInABranch(this.branches, nodeId)) {
            /*
             * node is in a branch so we will check if we should show
             * the node for this student. if the student has work in any
             * step in the branch path, we will show all the nodes in the
             * branch.
             */

            // get the branches this node id is in
            var branchPaths = this.ProjectService.getBranchPathsByNodeId(this.branches, nodeId);

            // loop through all the branch paths that this node id is in
            for (var bp = 0; bp < branchPaths.length; bp++) {
                var branchPathHasWork = false;

                // get a branch path
                var branchPath = branchPaths[bp];

                // loop through all the node ids in the branch path
                for (var n = 0; n < branchPath.length; n++) {

                    // get a node id in the branch path
                    var nodeIdInBranch = branchPath[n];

                    // get the work for this student for the node id
                    var componentStates = this.TeacherDataService.getComponentStatesByWorkgroupIdAndNodeId(this.workgroupId, nodeIdInBranch);

                    if (componentStates != null && componentStates.length > 0) {
                        /*
                         * the student has work for the step so we will say
                         * the branch path has work and that the node id
                         * passed into the function should be shown
                         */
                        result = true;
                    }
                }
            }

        } else {
            // node is not in a branch so we will show it
            result = true;
        }

        return result;
    };

    getNodePositionAndTitleByNodeId(nodeId) {
        return this.ProjectService.getNodePositionAndTitleByNodeId(nodeId);
    };

    getEventsByWorkgroupId(workgroupId) {
        return this.TeacherDataService.getEventsByWorkgroupId(workgroupId);
    };

    getEventsByWorkgroupIdAndNodeId(workgroupId, nodeId) {
        return this.TeacherDataService.getEventsByWorkgroupIdAndNodeId(workgroupId, nodeId);
    };

    getAnnotationsToWorkgroupId(workgroupId) {
        return this.TeacherDataService.getAnnotationsToWorkgroupId(workgroupId);
    };

    getAnnotationsToWorkgroupIdAndNodeId(workgroupId, nodeId) {
        return this.TeacherDataService.getAnnotationsToWorkgroupIdAndNodeId(workgroupId, nodeId);
    };

    getComponentStatesByWorkgroupIdAndNodeId(workgroupId, nodeId) {
        return this.TeacherDataService.getComponentStatesByWorkgroupIdAndNodeId(workgroupId, nodeId);
    };

    scoreChanged(stepWorkId) {
        var annotation = this.annotationMappings[stepWorkId + '-score'];
        this.AnnotationService.saveAnnotation(annotation);
    };

    commentChanged(stepWorkId) {
        var annotation = this.annotationMappings[stepWorkId + '-comment'];
        this.AnnotationService.saveAnnotation(annotation);
    }

    getComponentsByNodeId(nodeId) {
        return this.ProjectService.getComponentsByNodeId(nodeId);
    }

    /**
     * Get the student data for a specific student for a specific component
     * @param workgroupId the workgroupId id of Workgroup who created the component state
     * @param nodeId the node id
     * @param componentId the componentId the component id
     * @return the student data for the given component
     */
    getLatestComponentStateByWorkgroupIdAndNodeIdAndComponentId(workgroupId, nodeId, componentId) {
        var componentState = null;

        if (workgroupId != null && nodeId != null && componentId != null) {

            // get the latest component state for the component
            componentState = this.TeacherDataService.getLatestComponentStateByWorkgroupIdNodeIdAndComponentId(workgroupId, nodeId, componentId);
        }

        return componentState;
    }

    showNotebookReport($event) {
        this.NotebookService.retrieveNotebookItems(this.workgroupId).then((notebookItems) => {
            // assume only one report for now
            let reportItemId = this.NotebookService.config.itemTypes.report.notes[0].reportId;
            let reportItem = this.NotebookService.getLatestNotebookItemByLocalNotebookItemId(reportItemId);
            let reportItemContent = reportItem.content.content;
            this.$mdDialog.show(this.$mdDialog.alert({
                title: reportItem.content.title,
                htmlContent: reportItemContent,
                ok: 'Close',
                targetEvent: $event
            })).finally(() => { alert = undefined; });
        });
    }
}

StudentGradingController.$inject = [
    '$mdDialog',
    '$stateParams',
    'AnnotationService',
    'ConfigService',
    'NotebookService',
    'ProjectService',
    'TeacherDataService'
];

export default StudentGradingController;