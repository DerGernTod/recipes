var NavBar = React.createClass({
    render: function render(){
        return (
            <nav className="btn-group btn-group-justified">
                <Link to="/list" activeClassName="active" className="btn btn-default">Rezepte</Link>
                <Link to="/random"  activeClassName="active" className="btn btn-default">Zufallsrezepte</Link>
                <Link to="/search"  activeClassName="active" className="btn btn-default">Zutatensuche</Link>
            </nav>
        );
    }
});