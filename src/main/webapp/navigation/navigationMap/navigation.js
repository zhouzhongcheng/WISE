var project = null;
var projectContentIsDirty = false;

function getStepState() {
    return null;
}

function setContent(content) {
}

function nodeButtonClicked(nodeId) {
    navigation_moveToNode(nodeId);
}

function setProject(projectIn) {
    project = projectIn;
    renderProject();
}

function renderProject() {
    if (mode === 'student') {
        $('#authorView').hide();
        $('#studentView').show();
        
        $("body").append("starmap navigation");
        
        var nodes = project.nodes;
        
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            $('#studentView').append("<button onclick='nodeButtonClicked(\""+node.id+"\")'>" + node.title + " (" + node.type + ")</button>");
        }
    } else if (mode === 'author') {
        $('#studentView').hide();
        $('#authorView').show();
        
        $('#projectContentJSON').html(JSON.stringify(project, null, 4));
        $('#projectContentJSON').keyup(function() {
            projectContentIsDirty = true;
            $('#saveProjectContentButton').attr('disabled', false);
        });
        
        $('#saveProjectContentButton').click(function() {
            saveProjectContent(function() {
                $('#saveProjectContentButton').attr('disabled', true);
                projectContentIsDirty = false;
            })
        });
    } else if (mode === 'grade') {
        
    }
}

function saveProjectContent(callback, callbackArgs) {
    if (mode === 'author') {
        var projectContentJSON = $('#projectContentJSON').val();
        saveProjectContentToWISE(projectContentJSON, callback, callbackArgs);
    }
};

function setStepState(stepState) {
    $.ajax({
        type: "POST",
        url:"echo.php",
        data:{"stepState":JSON.stringify(stepState)},
        success:function(data) {
        
        $("#message").html(JSON.stringify(data));
        }
        
    });

}