var AdminTagsPage = React.createClass({
    componentDidMount : function componentDidMount(){

    },
    render : function render(){
        return (
            <div className="adminContainer center-block">
                <AdminSearch focus="true" createLink="/admin/tags/id/new" />
                {this.props.children}
            </div>
        );
    }
});
var AdminTagsIdPage = React.createClass({
    componentDidMount : function componentDidMount(){
        $(this.refs.tagNameInput).focus();
    },
    onFormSubmit : function onFormSubmit(e){
        e.preventDefault();
        
        var jqueryInput = $(this.refs.tagNameInput);
        var jqueryButton = $(this.refs.submitButton);
        if(!jqueryInput.val().trim()){
            jqueryInput.val("").focus();
            //todo: message
            return;
        }
        jqueryInput.attr('disabled', 'disabled');
        jqueryButton.attr('disabled', 'disabled');
        var data = {
            tagName : this.refs.tagNameInput.value,
            timestamp : Date.now()
        }
        $.post("/api/addTag", data).complete(xhr => {
            var xhrResult = xhr.responseJSON;
            jqueryButton.removeClass('btn-default');
            if(xhrResult.success){
                jqueryButton.addClass('btn-success');
                jqueryButton.val("Fertig!");
                //cool
            }else{
                jqueryButton.addClass('btn-warning');
                jqueryButton.val(xhrResult.message);
                //print message (e.message)
            }
            setTimeout(()=>{
                jqueryInput.val("");
                jqueryButton.val("Hinzufügen");
                jqueryButton.removeClass('btn-success');
                jqueryButton.removeClass('btn-warning');
                jqueryButton.addClass('btn-default');
                jqueryInput.removeAttr('disabled');
                jqueryButton.removeAttr('disabled');
                jqueryInput.focus();

            }, 1500);
        } );
    },
    render : function render(){
        var formData = {};
        if(this.props.params.tagId.toLowerCase() == "new"){
            formData.test = "leeeeeeeer";
        }else{
            //todo: search db for id, if unavailable show error
            var dbResult = { valid : false }
            if(!dbResult.valid){
                return (
                    <div>error, tag not found!</div>
                );
            }
        }

        return (
            
            <div>
                AdminTagsIdPage {formData.test}
                <form onSubmit={this.onFormSubmit}>
                    <input className="form-control" ref="tagNameInput" type="text" placeholder="Tag" />
                    <input className="btn btn-default center-block" ref="submitButton" type="submit" value="Hinzufügen" />
                </form>
            </div>
        );
    }
});
var AdminTagsSearchPage = React.createClass({
    render : function render(){
        return (
            <div>
                adminingredientpage
            </div>
        );
    }
});
var AdminTagsLatestPage = ReactRouter.withRouter(React.createClass({
    //TODO: store input elements in this component and handle inputmode/textmode there. less jquery!
    mixins : [
        ReactRouter.State,
        ReactRouter.Navigation
    ],
    getInitialState : function getInitialState(){
        return { tags : []};
    },
    componentDidMount : function componentDidMount(){
        $.get("/api/latestTags").done((data => {
            this.setState({tags : data});
        }).bind(this));
    },
    deleteTag : function deleteTag(e){
        var element = $(e.target);
        if(element.attr('disabled')){
            return;
        }
        element.attr('disabled', 'disabled');
        $.post("/api/deleteTag", {tagId : element.parent().data('tag-id')})
        .complete((xhr) => {
            element.removeAttr('disabled');
            if(xhr.responseJSON.success){
                element.parent().hide();
            }else{
                element.removeClass('btn-default').addClass('btn-warning').text("⚠");
                setTimeout(() => {
                    element.addClass('btn-default').removeClass('btn-warning').text("x");
                }, 500);
            }
        });
    },
    editTag : function editTag(e){
        var textTag = $(e.target);
        var tagIdToDelete = textTag.parent().data('tag-id');
        var inputWrapper = $(this.refs['input_' + tagIdToDelete]);
        var inputTag = inputWrapper.find('input');

        textTag.hide();
        inputWrapper.show();
        inputTag.focus();
        inputTag.select();
    },
    editTagCompleteInput : function editTagCompleteInput(e){
        this.editTagComplete({target : $(e.target).parent(), preventDefault : e.preventDefault});
    },
    editTagComplete : function editTagComplete(e){
        e.preventDefault();
        var formElem = $(e.target);
        var tagElem = formElem.parent().parent();
        var tagIdToUpdate = tagElem.data('tag-id');

        var inputWrapper = $(this.refs['input_' + tagIdToUpdate]);
        var inputElem = inputWrapper.find('input');
        var value = inputElem.val();
        inputElem.prop('disabled', true);

        $.post("/api/tags/edit", {tagId: tagIdToUpdate, tagName: value}).complete(xhr => {
            var result = xhr.responseJSON;
            inputElem.prop('disabled', false);
            if(result && result.success){
                tagElem.find('.tagText').show();
                inputWrapper.hide();
            }else{
                inputElem.addClass('error');
            }
            console.log("edit tag complete");

        });
    },
    onChangeTagValue : function editTagValue(e){
        var inputTag = $(e.target);
        inputTag.removeClass('error');
        var tagElem = inputTag.parent().parent().parent();
        var tagId = tagElem.data('tag-id');
        var tagIndex = tagElem.data('tag-index');
        var currentTag = this.state.tags[tagIndex];
        currentTag.value.tagName = e.target.value;
        var newState = this.state;
        newState.tags[tagIndex] = currentTag;
        this.setState(newState);
    },
    render : function render(){
        var entries = [];
        for(var i in this.state.tags){
            var tag = this.state.tags[i];
            var tagId = tag.id;
            var inputId = "input_" + tagId;
            entries.push((
                <div className="tag clearfix" key={tagId} data-tag-id={tagId} data-tag-index={i} >
                    <div className="btn btn-default right" onClick={this.deleteTag} data-tag-id={tagId}>x</div>
                    <div className="tagText" onClick={this.editTag}>{tag.value.tagName}</div>
                    <div className="inputWrapper" ref={inputId} >
                        <form onSubmit={this.editTagComplete} >
                            <input type="text" onBlur={this.editTagCompleteInput} autoFocus="true" onChange={this.onChangeTagValue} autofocus className="form-control" value={tag.value.tagName} />
                        </form>
                    </div>
                </div>
            ));
        }
        return (
            <div>
                {entries}
            </div>
        );
    }
}));