var Container = React.createClass({

    render: function render(){
        return (
            <div>
                <header>
                    <div class="logo">
                        <Link to="/">Logo</Link>
                    </div>
                    <NavBar />
                    //logo
                    //navliste
                    ///navbuttons
                    //suche
                </header>
                {this.props.children}
            </div>
        );
    }
});