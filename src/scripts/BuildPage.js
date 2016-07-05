var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;
var Router = ReactRouter.Router;
var routes = (
    <Router history={hashHistory}>
        <Route name="container" path="/" component={Container}>
            <IndexRoute component={RecipeGridPage} />
            <Route name="list" path="/list" component={RecipeListPage}/>
            <Route name="random" path="/random" component={RandomRecipePage}/>
            <Route name="search" path="/search" component={IngredientSearchPage}/>
        </Route>
    </Router>
);
ReactDOM.render(routes,
    document.getElementById('content')
);
