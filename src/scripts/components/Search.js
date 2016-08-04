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
         return (
            <div>
                <Search focus={this.props.focus} classNames="search pull-left form-control"/>
                <Link to={this.props.createLink} className="btn btn-default pull-right">+</Link>
                <div className="clearfix"/>
            </div>
         );
    }
});