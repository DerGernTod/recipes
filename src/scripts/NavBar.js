var NavBar = React.createClass({
    render: function render(){
        return (
            <nav>
                <Link to="/list" activeClassName="active">Rezepte</Link>
                <Link to="/random"  activeClassName="active">Zufallsrezepte</Link>
                <Link to="/search"  activeClassName="active">Zutatensuche</Link>
            </nav>
        );
    }
});