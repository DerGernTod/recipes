var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;
var Router = ReactRouter.Router;
function requireAuth(nextState, replace){
    if(!AuthStore.loggedIn()){
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

var routes = (
    <Router history={hashHistory}>
        <Route name="container" path="/" component={Container}>
            <IndexRoute component={RecipeGridPage} />
            <Route name="login" path="/login" component={LoginPage}/>
            <Route name="admin" path="/admin" component={AdminPage} onEnter={requireAuth}/>
            <Route name="list" path="/list" component={RecipeListPage}/>
            <Route name="random" path="/random" component={RandomRecipePage}/>
            <Route name="search" path="/search" component={IngredientSearchPage}/>
            <Route name="recipe" path="/recipe/:recipeId" component={RecipePage}/>
            <Route name="notfount" path="*" component={NotFoundPage} />
        </Route>
    </Router>
);
ReactDOM.render(routes,
    document.getElementById('content')
);
