var AdminTagsPage = React.createClass({
    render : function render(){
        return (
            
            <div className="adminContainer center-block">
                <AdminSearch createLink="/admin/tags/id/new" />
                {this.props.children}
            </div>
        );
    }
});
var AdminTagsIdPage = React.createClass({
    onFormSubmit : function onFormSubmit(){
        var jqueryInput = $(this.refs.tagNameInput);
        var jqueryButton = $(this.refs.submitButton);
        if(!jqueryInput.val()){
            //todo: message
            return;
        }
        jqueryInput.attr('disabled', 'disabled');
        jqueryButton.attr('disabled', 'disabled');
        var data = {
            tagName : this.refs.tagNameInput.value,
            timestamp : Date.now()
        }
        $.post("/api/addTag", data, function(e){
            jqueryButton.removeClass('btn-default');
            if(e.success){
                jqueryButton.addClass('btn-success');
                jqueryButton.val("Fertig!");
                //cool
            }else{
                jqueryButton.addClass('btn-warning');
                jqueryButton.val(e.message);
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
var AdminTagsLatestPage = React.createClass({
    getInitialState : function getInitialState(){
        return { tags : []};
    },
    componentDidMount : function componentDidMount(){
        $.get("/api/latestTags", function(data){
            this.setState({tags : data});
        }.bind(this));
    },
    render : function render(){
        var entries = [];
        for(var i in this.state.tags){
            var tag = this.state.tags[i];
            var tagId = "tag_" + tag.id;
            entries.push((
                <div className="tag" key={tagId}>
                    <span>{tag.id}</span>
                    <span className="btn btn-default">x</span>
                </div>
            ));
        }
        return (
            <div>
                {entries}
            </div>
        );
    }
});