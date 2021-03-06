var coreScripts = [
	'vle/node/brainstorm/BrainstormNode.js',
	'vle/node/brainstorm/brainstormEvents.js'
];

var studentVLEScripts = [
    scriptloader.jquerySrc,
    scriptloader.jqueryUISrc,
	'vle/lib/jquery/js/jsonplugin.js',
	'vle/node/common/nodehelpers.js',
	'vle/util/helperfunctions.js',
	'vle/node/brainstorm/brainstorm.js',
	'vle/node/brainstorm/brainstormstate.js',
	'vle/model/nodevisit.js',
	'vle/lib/tinymce4/js/tinymce/tinymce.min.js'
];

var authorScripts = [
	'vle/node/brainstorm/authorview_brainstorm.js'
];

var gradingScripts = [
	'vle/node/brainstorm/brainstormstate.js'
];

var dependencies = [
	{child:"vle/node/brainstorm/BrainstormNode.js", parent:["vle/node/Node.js"]},
];

var css = [
	"vle/node/common/css/htmlAssessment.css",
	"vle/node/brainstorm/brainstorm.css"
];

var nodeClasses = [
	{nodeClass:'brainstorm', nodeClassText:'Brainstorm session', icon:'node/brainstorm/icons/brainstorm28.png'},
	{nodeClass:'qadiscuss', nodeClassText:'Q&A Discussion', icon:'node/brainstorm/icons/qadiscuss28.png'}
];

var nodeIconPath = 'node/brainstorm/icons/';
componentloader.addNodeIconPath('BrainstormNode', nodeIconPath);

scriptloader.addScriptToComponent('core', coreScripts);
scriptloader.addScriptToComponent('brainstorm', studentVLEScripts);
scriptloader.addScriptToComponent('author', authorScripts);
scriptloader.addScriptToComponent('studentwork', gradingScripts);
scriptloader.addDependencies(dependencies);
scriptloader.addCssToComponent('brainstorm', css);

componentloader.addNodeClasses('BrainstormNode', nodeClasses);

var nodeTemplateParams = [
	{
		nodeTemplateFilePath:'node/brainstorm/brainstormTemplate.bs',
		nodeExtension:'bs'
	}
];

componentloader.addNodeTemplateParams('BrainstormNode', nodeTemplateParams);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/brainstorm/setup.js');
};