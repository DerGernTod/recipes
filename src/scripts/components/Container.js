var Container = React.createClass({

    render: function render(){
        return (
            <div>
                <header>
                    <div className="logo col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <Link to="/">Logo</Link>
                    </div>
                    <NavBar />
                    <form className="pull-right  col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <input className="pull-right" type="text" placeholder="Suche" />
                    </form>
                </header>
                {this.props.children}
            </div>
        );
    }
});