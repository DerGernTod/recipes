import React from 'react';
import {withRouter, State, Navigation} from 'react-router';
import $ from 'jquery';
import EditableDeletable from '../../components/admin/EditableDeletable.jsx';
import {AdminSearch} from '../../components/Search.jsx';
var AdminTagsPage = React.createClass({
    componentDidMount : function componentDidMount(){

    },
    addTag : function addTag(){
        $('.simpleList li:first-child div.text').text("");
        $('.simpleList li:first-child').show();
        $('.simpleList li:first-child div.text').focus();
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
var AdminTagsSearchPage = React.createClass({
    render : function render(){
        return (
            <div>
                adminingredientpage
            </div>
        );
    }
});
var AdminTagsLatestPage = withRouter(React.createClass({
    //TODO: store input elements in this component and handle inputmode/textmode there. less jquery!
    mixins : [
        State,
        Navigation
    ],
    getInitialState : function getInitialState(){
        return { tags : []};
    },
    componentDidMount : function componentDidMount(){
        
        $.get("/api/tags/latest").done((response => {
            if(response.success){
                var newObj = [];
                var data = response.response;
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
            }else{
                console.log("Error getting latest tags: ", response);
            }
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
            <ul className="simpleList">
                <li ref="addTagLi" key="tags_add">
                    <EditableDeletable ref="addTag" updateUrl="/api/tags/add" onEditComplete={this.addComplete} entry={emptyEntry}/>
                </li>
                {entries}
            </ul>
        );
    }
}));
export {AdminTagsLatestPage, AdminTagsPage, AdminTagsSearchPage};