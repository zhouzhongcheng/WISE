"use strict";

class NotebookReportController {
    constructor($filter,
                $mdSidenav,
                ConfigService,
                NotebookService,
                ProjectService) {
        this.$filter = $filter;
        this.$mdSidenav = $mdSidenav;
        this.ConfigService = ConfigService;
        this.NotebookService = NotebookService;
        this.ProjectService = ProjectService;
        
        this.$translate = this.$filter('translate');
        
        this.full = false;
        this.collapsed = true;

        this.dirty = false;
        this.autoSaveInterval = 30000;  // the auto save interval in milliseconds

        this.saveMessage = {
            text: '',
            time: ''
        };
        
        // assume only one report for now
        this.reportId = this.config.itemTypes.report.notes[0].reportId;
        this.reportItem = this.NotebookService.getLatestNotebookReportItemByReportId(this.reportId, this.workgroupId);
        if (this.reportItem) {
            let serverSaveTime = this.reportItem.serverSaveTime;
            let clientSaveTime = this.ConfigService.convertToClientTimestamp(serverSaveTime);
            this.setSaveMessage(this.$translate('saved'), clientSaveTime);
        } else {
            // Student doesn't have work for this report yet, so we'll use the template.
            this.reportItem = this.NotebookService.getTemplateReportItemByReportId(this.reportId);
            if (this.reportItem == null) {
                // if there is no template, don't allow student to work on the report.
                return;
            }
        }
        // set the id to null so it can be inserted as initial version, as opposed to updated. this is true for both new and just-loaded reports.
        this.reportItem.id = null;
        // replace relative asset paths with absolute asset paths
        this.reportItemContent = this.ProjectService.injectAssetPaths(this.reportItem.content.content);
        // start auto-saving
        this.startAutoSaveInterval();
        
        // summernote editor options
        this.summernoteOptions = {
            toolbar: [
                ['edit', ['undo', 'redo']],
                ['style', ['bold', 'italic', 'underline'/*, 'superscript', 'subscript', 'strikethrough', 'clear'*/]],
                //['style', ['style']],
                //['fontface', ['fontname']],
                //['textsize', ['fontsize']],
                //['fontclr', ['color']],
                ['para', ['ul', 'ol', 'paragraph'/*, 'lineheight'*/]],
                //['height', ['height']],
                //['table', ['table']],
                //['insert', ['link','picture','video','hr']],
                //['view', ['fullscreen', 'codeview']],
                //['help', ['help']]
                ['customButton', ['customButton']]
                //['print', ['print']]
            ],
            popover: {
                image: [
                    ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                    //['float', ['floatLeft', 'floatRight', 'floatNone']],
                    ['remove', ['removeMedia']]
                ]
            },
            customButton: {
                // TODO: i18n
                buttonText: 'Insert ' + this.config.itemTypes.note.label.singular + ' +',
                tooltip: 'Insert from ' + this.config.label,
                buttonClass: 'accent-1 notebook-item--report__add-note',
                action: ($event) => {
                    this.addNotebookItemContent($event);
                }
            },
            disableDragAndDrop: true,
            toolbarContainer: '#' + this.reportId + '-toolbar',
            callbacks: {
                onBlur: function () {
                    $(this).summernote('saveRange');
                }
            }
        };
        
        this.$onChanges = (changes) => {
            if (changes.insertContent && !changes.insertContent.isFirstChange() && changes.insertContent.currentValue) {
                // a notebook item is being inserted into the report
                let item = angular.copy(changes.insertContent.currentValue);
                
                // prepare summernote editor instance
                let reportElement = $('#' + this.reportId);
                reportElement.summernote('focus');
                reportElement.summernote('restoreRange');
                
                // create a jQuery DOM element to insert into the Summernote report editor
                let $item = $('<p>');
                let hasAttachments = false;
                
                if (item.content) {
                    if (item.content.attachments) {
                        if (item.content.attachments.length) {
                            hasAttachments = true;
                            // item includes attachments, so center align element
                            $item.css('text-align', 'center');
                        }
                        for (let a = 0; a < item.content.attachments.length; a++) {
                            // add each attachment to the element
                            let notebookItemAttachment = item.content.attachments[a];
                            let iconURL = notebookItemAttachment.iconURL;
                            let $img = $('<img src="' + iconURL + '" alt="notebook image" style="width: 75%; max-width: 100%; height: auto; border: 1px solid #aaaaaa; padding: 8px; margin-bottom: 4px;" />');
                            $img.addClass('notebook-item--report__note-img');
                            $item.append($img);
                        }
                    }
                    if (item.content.text) {
                        // item contains text, so add to element
                        if (hasAttachments) {
                            // item has attachments, so treat text content as a caption: center it and make it bold
                            let $caption = $('<div><b>' + item.content.text + '</b></div>').css({'text-align': 'center'});
                            $item.append($caption);
                            reportElement.summernote('insertNode', $item[0]);
                        } else {
                            // note only contains text, so insert plain text
                            reportElement.summernote('insertText', item.content.text);
                        }
                    } else {
                        reportElement.summernote('insertNode', $item[0]);
                    }
                }
                
            }
        }
    }
    
    collapse() {
        this.collapsed = !this.collapsed;
        
        if (this.collapsed) {
            this.onCollapse();
        }
    }
    
    fullscreen() {
        if (this.collapsed) {
            this.full = true;
            this.collapsed = false;
        } else {
            this.full = !this.full;
        }
    }
    
    addNotebookItemContent($event) {
        this.onInsert($event);
    }
    
    changed(value) {
        // report content had changed
        this.dirty = true;
        
        /*
         * remove the absolute asset paths
         * e.g.
         * <img src='https://wise.berkeley.edu/curriculum/3/assets/sun.png'/>
         * will be changed to
         * <img src='sun.png'/>
         */
        this.reportItem.content.content = this.ConfigService.removeAbsoluteAssetPaths(value);
    }
    
    /**
     * Start the auto save interval for this report
     */
    startAutoSaveInterval() {
        this.stopAutoSaveInterval();  // stop any existing interval
        this.autoSaveIntervalId = setInterval(() => {
            // check if the student work is dirty
            if (this.dirty) {
                // the student work is dirty so we will save.
                // obtain the component states from the children and save them to the server
                this.saveNotebookReportItem();
            }
        }, this.autoSaveInterval);
    }
    
    /**
     * Stop the auto save interval for this report
     */
    stopAutoSaveInterval() {
        clearInterval(this.autoSaveIntervalId);
    }
    
    /**
     * Save the notebook report item to server
     */
    saveNotebookReportItem() {
        // save new report notebook item
        this.reportItem.content.clientSaveTime = Date.parse(new Date());  // set save timestamp
        this.NotebookService.saveNotebookItem(this.reportItem.id, this.reportItem.nodeId, this.reportItem.localNotebookItemId,
            this.reportItem.type, this.reportItem.title, this.reportItem.content, this.reportItem.content.clientSaveTime)
            .then((result) => {
                if (result) {
                    this.dirty = false;
                    this.reportItem.id = result.id; // set the reportNotebookItemId to the newly-incremented id so that future saves during this visit will be an update instead of an insert.
                    let serverSaveTime = result.serverSaveTime;
                    let clientSaveTime = this.ConfigService.convertToClientTimestamp(serverSaveTime);

                    // set save message
                    this.setSaveMessage(this.$translate('saved'), clientSaveTime);
                }
            });
    }
    
    /**
     * Set the message next to the save button
     * @param message the message to display
     * @param time the time to display
     */
    setSaveMessage(message, time) {
        this.saveMessage.text = message;
        this.saveMessage.time = time;
    }
}

NotebookReportController.$inject = [
    '$filter',
    '$mdSidenav',
    'ConfigService',
    'NotebookService',
    'ProjectService'
];

const NotebookReport = {
    bindings: {
        config: '<',
        insertContent: '<',
        insertMode: '<',
        reportId: '<',
        visible: '<',
        onInsert: '&',
        onCollapse: '&'
        //onClose: '&'
    },
    template:
        `<div ng-if="($ctrl.visible && $ctrl.full && !$ctrl.collapsed) || $ctrl.insertMode" class="notebook-report-backdrop"></div>
        <div ng-if="$ctrl.visible" class="notebook-report-container"
              ng-class="{'notebook-report-container__collapsed': $ctrl.collapsed, 'notebook-report-container__full': $ctrl.full && !$ctrl.collapsed}">
            <md-card class="notebook-report md-whiteframe-3dp l-constrained-md">
                <md-toolbar ng-click="$ctrl.collapsed ? $ctrl.collapse() : return" class="md-toolbar--wise md-toolbar--wise--sm notebook-report__toolbar">
                    <md-toolbar-tools class="md-toolbar-tools">
                        <md-icon>assignment</md-icon>&nbsp;
                        <span ng-if="$ctrl.collapsed" class="overflow--ellipsis notebook-report__toolbar__title">{{$ctrl.reportItem.content.title}}</span>
                        <span flex></span>
                        <md-button aria-label="{{'toggleFullScreen' | translate}}" title="{{'toggleFullScreen' | translate}}" class="md-icon-button notebook-tools--full"
                                   ng-if="!$ctrl.full || $ctrl.collapsed" ng-click="$ctrl.fullscreen()">
                            <md-icon> zoom_out_map </md-icon>
                        </md-button>
                        <md-button aria-label="{{'toggleFullScreen' | translate}}" title="{{'toggleFullScreen' | translate}}" class="md-icon-button notebook-tools--full"
                                   ng-if="$ctrl.full && !$ctrl.collapsed" ng-click="$ctrl.fullscreen()">
                            <md-icon> fullscreen_exit </md-icon>
                        </md-button>
                        <md-button aria-label="{{'collapse' | translate}}" title="{{'collapse' | translate}}" class="md-icon-button"
                                   ng-if="!$ctrl.collapsed" ng-click="$event.stopPropagation(); $ctrl.collapse()">
                            <md-icon> arrow_drop_down </md-icon>
                        </md-button>
                        <md-button aria-label="{{'restore' | translate}}" title="{{'restore' | translate}}" class="md-icon-button"
                                   ng-if="$ctrl.collapsed" ng-click="$event.stopPropagation(); $ctrl.collapse()">
                            <md-icon> arrow_drop_up </md-icon>
                        </md-button>
                        <!--<md-button aria-label="{{'close' | translate}}" class="md-icon-button"
                                   ng-click="$ctrl.onClose()">
                            <md-icon> close </md-icon>
                        </md-button>-->
                    </md-toolbar-tools>
                </md-toolbar>
                <md-content class="notebook-report__content" flex ui-scrollpoint ui-scrollpoint-action="$ctrl.setEditorPosition">
                    <div class="notebook-report__content__header" layout="row" layout-align="start center">
                        <span style="color: {{$ctrl.config.itemTypes.report.label.color}};">{{$ctrl.reportItem.content.title}}</span>
                        <span flex></span>
                        <md-icon aria-label="{{$ctrl.reportItem.content.title}} info" style="color: {{$ctrl.config.itemTypes.report.label.color}};">
                            info
                            <md-tooltip md-direction="left">{{$ctrl.reportItem.content.prompt}}</md-tooltip>
                        </md-icon>
                    </div>
                    <summernote id="{{$ctrl.reportId}}"
                                class="notebook-item--report__content"
                                ng-model="$ctrl.reportItemContent"
                                ng-change="$ctrl.changed($ctrl.reportItemContent)"
                                config="$ctrl.summernoteOptions"></summernote>
                </md-content>
                <md-card-actions class="notebook-report__actions">
                    <div id="{{$ctrl.reportId}}-toolbar"></div>
                    <div layout="row" layout-align="start center">
                        <md-button class="md-primary md-raised button--small"
                                   aria-label="{{ 'save' | translate }}"
                                   ng-disabled="!$ctrl.dirty"
                                   ng-click="$ctrl.saveNotebookReportItem()">{{ 'save' | translate }}</md-button>
                        <span ng-show="$ctrl.saveMessage.text"
                              class="component__actions__info md-caption">
                              {{$ctrl.saveMessage.text}} <span class="component__actions__more"><md-tooltip md-direction="top">{{ $ctrl.saveMessage.time | amDateFormat:'ddd, MMM D YYYY, h:mm a' }}</md-tooltip><span am-time-ago="$ctrl.saveMessage.time"></span></span>
                        </span>
                    </div>
                </md-card-actions>
            </md-card>
        </div>`,
    controller: NotebookReportController
};

export default NotebookReport;