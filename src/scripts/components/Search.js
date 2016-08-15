var Search = React.createClass({
    componentDidMount : function componentDidMount(){
        if(this.props.focus){
            $(this.refs.search).focus();
        }
    },
    render : function render(){
        return (
            <input className={this.props.classNames} ref="search" type="text" placeholder="Suche... 🔍" />
        );
    }
});

var AdminSearch = React.createClass({
    render : function render(){
        var attributeProps = {};
        if(this.props.createFunction){
            attributeProps.onClick = this.props.createFunction;
        }
        var element;
        if(this.props.createLink){
            attributeProps.to = this.props.createLink;
            element = (<Link {...attributeProps} className="btn btn-default pull-right">+</Link>);
        }else{
            element = (<div {...attributeProps} className="btn btn-default pull-right">+</div>);
        }

         return (
            <div>
                <Search focus={this.props.focus} classNames="search pull-left form-control"/>
                {element}
                <div className="clearfix"/>
            </div>
         );
    }
});