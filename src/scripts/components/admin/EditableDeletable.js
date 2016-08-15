var EditableDeletable = React.createClass({
    componentDidMount : function componentDidMount(){
        this.previousName = this.props.entry.name;
        this.setState({
            id : this.props.entry.id,
            name : this.previousName
        });
        $(this.refs.text).attr('contenteditable', true).text(this.previousName);
    },
    getInitialState : function getInitialState(){
        return { 
            id : -1,
            name : ""
        };
    },
    deleteEntry : function deleteEntry(e) {
        var element = $(e.target);
        if(this.props.deleteUrl){
            if(element.attr('contenteditable')){
                return;
            }
            element.attr('contenteditable', false);
            $.post(this.props.deleteUrl, {id : this.state.id})
            .complete((xhr) => {
                element.attr('contenteditable', true);
                if(!xhr.responseJSON.success){
                    element.removeClass('btn-default').addClass('btn-warning').text("⚠");
                    setTimeout(() => {
                        element.addClass('btn-default').removeClass('btn-warning').text("x");
                    }, 500);
                }else if(this.props.onDelete){
                    this.props.onDelete(this.props.entry);
                }
            });
        }else if(this.props.onDelete){
            this.props.onDelete(this.props.entry);
        }
    },
    entryKeyDown : function entryKeyUp(e){
        if(e.keyCode == 13){ //pressed enter
            $(e.target).blur();
        }
    },
    entryUpdated : function entryUpdated(e){
        var curText = $(e.target).html();
        var shouldCommit = false;
        if(~curText.indexOf("<br")){
            curText = curText.replace(/<.*\/?>/g, "");
            //$(e.target).text(curText);
        }
        this.setState({
            id : this.props.entry.id,
            name : curText
        });

        if(shouldCommit){
            $(e.target).blur();
        }
    },
    editEntryFinished : function editEntryFinished() {
        if(this.previousName == this.state.name){
            if(this.props.onEditComplete){
                this.props.onEditComplete(false, false);
            }
            return;
        }
        var inputElem = $(this.refs.text);
        inputElem.attr('contenteditable', false);
        $.post(this.props.updateUrl, this.state).complete((xhr => {
            var result = xhr.responseJSON;
            inputElem.attr('contenteditable', true);
            var callbackData = {id : false, name : false};
            if(result && result.success){
                inputElem.addClass('success');
                setTimeout(() => {
                    inputElem.removeClass('success');
                }, 200);
                this.previousName = this.state.name;
                callbackData = {id : result.response.id, name : this.state.name};
            }else{
                inputElem.addClass('error');
                setTimeout(() => {
                    inputElem.removeClass('error');
                }, 200);
                this.state.name = this.previousName;
                inputElem.text(this.previousName);
            }
            if(this.props.onEditComplete){
                this.props.onEditComplete(callbackData.id, callbackData.name);
            }
        }).bind(this));
    },
    render : function render() {
        if(this.props.onDelete){
            
            return (
                <div className="editableDeletable clearfix" data-id={this.state.id} >
                    <div className="btn btn-default right" onClick={this.deleteEntry} data-id={this.state.id}>x</div>
                    <div ref="text" spellCheck="false" onKeyDown={this.entryKeyDown} onInput={this.entryUpdated} onBlur={this.editEntryFinished} className="text"></div>
                </div>
            ); 
        }
        return (
            <div className="editableDeletable clearfix" data-id={this.state.id} >
                <div ref="text" spellCheck="false" onKeyDown={this.entryKeyDown} onInput={this.entryUpdated} onBlur={this.editEntryFinished} className="text"></div>
            </div>
        );
    }
});