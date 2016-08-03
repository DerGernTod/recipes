var Search = React.createClass({
    componentDidMount : function componentDidMount(){
        
    },
    render : function render(){
        return (
            <input className={this.props.classNames} type="text" placeholder="Suche... 🔍" />
        );
    }
});

var AdminSearch = React.createClass({
    render : function render(){
         return (
            <div>
                <Search classNames="search pull-left form-control"/>
                <Link to={this.props.createLink} className="btn btn-default pull-right">+</Link>
                <div className="clearfix"/>
            </div>
         );
    }
});