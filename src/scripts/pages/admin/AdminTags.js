var AdminTagsPage = React.createClass({
    componentDidMount : function componentDidMount(){

    },
    addTag : function addTag(){
        $('.tagList li:first-child div.text').text("");
        $('.tagList li:first-child').show();
        $('.tagList li:first-child div.text').focus();
    },
    render : function render(){
        return (
            <div className="adminContainer center-block">
                <AdminSearch focus="true" createFunction={this.addTag} />
                {this.props.children}
            </div>
        );
    }
});
var AdminTagsIdPage = React.createClass({
    componentDidMount : function componentDidMount(){
        $(this.refs.tagNameInput).focus();
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
        $(this.refs.addTagLi).hide();
    },
    addComplete : function addComplete(id, name){
        $(this.refs.addTagLi).hide();
        if(!id || !name){
            return;
        }
        var tags = this.state.tags;
        tags = tags.slice(0);
        tags.unshift({id : id, name : name});
        this.setState({tags:[]});
        this.setState({tags : tags});
    },
    tagDeleted : function tagDeleted(entry){
        var tags = this.state.tags.slice(0);
        var index = tags.indexOf(entry);
        $(this.refs.addTagLi).hide();
        if(index != -1){
            tags.splice(index, 1);
            this.setState({tags:[]});
            this.setState({tags: tags});
        }
    },
    render : function render(){
        var entries = [];
        for(var i in this.state.tags){
            entries.push((
                <li key={"tag_" + i}>
                    <EditableDeletable stateId={i} onDelete={this.tagDeleted} deleteUrl="/api/tags/delete" updateUrl="/api/tags/edit" entry={this.state.tags[i]} />
                </li>
            ));
        }
        var emptyEntry = {
            id : "new", 
            name : ""
        };
        return (
            <ul className="tagList">
                <li ref="addTagLi" key="tags_add">
                    <EditableDeletable ref="addTag" updateUrl="/api/tags/add" onEditComplete={this.addComplete} entry={emptyEntry}/>
                </li>
                {entries}
            </ul>
        );
    }
}));