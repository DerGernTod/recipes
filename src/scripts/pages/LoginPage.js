var LoginPage = React.createClass({
    getInitialState: function getInitialState(){
        return { user: '', password: ''};
    },
    handlePasswordChange: function handlePasswordChange(evt){
        this.setState({ password : evt.target.value});
    },
    handleUserChange: function handleUserChange(evt){
        this.setState({ user : evt.target.value});
    },
    login: function login(){
        console.log("trying to login");
        if(this.state.user == "123" && this.state.password == "456"){
            
            console.log("state is correct!");
            AuthStore.setLoggedIn();
        }
        
    },
    render : function render(){
        return (
            <form>
                <div className="form-group">
                    <input type="text" value={this.state.user} onChange={this.handleUserChange} placeholder="Username" />
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
                </div>
                <button type="submit" onClick={this.login}>Login</button>
            </form>
        )
    }
});