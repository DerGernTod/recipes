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
        if(this.timeoutId){
            cancelTimeout(this.timeoutId);
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
            jqueryInput.val("");
            jqueryInput.focus();
            jqueryInput.removeAttr('disabled');
            jqueryButton.removeAttr('disabled');
            this.timeoutId = setTimeout(()=>{
                jqueryButton.val("Hinzufügen");
                jqueryButton.removeClass('btn-success');
                jqueryButton.removeClass('btn-warning');
                jqueryButton.addClass('btn-default');
            }, 500);
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
        $.get("/api/tags/latest").done((data => {
            var newObj = [];
            for(var i in data){
                if(data.hasOwnProperty(i)){
                    var curObj = data[i];
                    newObj[i] = {
                        id : curObj.id,
                        name : curObj.value.tagName
                    };      
                }
            }
            this.setState({tags : newObj});
        }).bind(this));
    },
    render : function render(){
        var entries = [];
        for(var i in this.state.tags){
            entries.push((
                <li key={"tag_" + i}>
                    <EditableDeletable deleteUrl="/api/tags/delete" updateUrl="/api/tags/edit" entry={this.state.tags[i]} />
                </li>
            ));
        }
        return (
            <ul className="tagList">
                {entries}
            </ul>
        );
    }
}));