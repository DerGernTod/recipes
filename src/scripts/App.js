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
        <Route path="/login" component={LoginPage}/>
        <Route path="/admin" component={AdminContainer} onEnter={requireAuth}>
            <IndexRoute component={AdminRecipesPage} />
            <Route path="/admin/recipes" component={AdminRecipesPage}>
                <IndexRoute component={AdminRecipesLatestPage} />
                <Route path="/admin/recipes/latest" component={AdminRecipesLatestPage}/>
                <Route path="/admin/recipes/search/:keyword" component={AdminRecipesSearchPage}/>
                <Route path="/admin/recipes/id/:recipeId" component={AdminRecipesIdPage}/>
            </Route>
            <Route path="/admin/ingredients" component={AdminIngredientsPage}>
                <IndexRoute component={AdminIngredientsLatestPage} />
                <Route path="/admin/ingredients/latest" component={AdminIngredientsLatestPage}/>
                <Route path="/admin/ingredients/search/:keyword" component={AdminIngredientsSearchPage}/>
                <Route path="/admin/ingredients/id/:ingredientId" component={AdminIngredientsIdPage}/>
            </Route>
            <Route path="/admin/tags" component={AdminTagsPage}>
                <IndexRoute component={AdminTagsLatestPage} />
                <Route path="/admin/tags/latest" component={AdminTagsLatestPage}/>
                <Route path="/admin/tags/search/:keyword" component={AdminTagsSearchPage}/>
                <Route path="/admin/tags/id/:tagId" component={AdminTagsIdPage}/>
            </Route>
            <Route path="/admin/*" component={NotFoundPage}/>
        </Route>
        <Route path="/" component={Container}>
            <IndexRoute component={RecipeGridPage} />
            <Route path="/list" component={RecipeListPage}/>
            <Route path="/random" component={RandomRecipePage}/>
            <Route path="/search" component={IngredientSearchPage}/>
            <Route path="/recipe/:recipeId" component={RecipePage}/>
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Router>
);
ReactDOM.render(routes,
    document.getElementById('content')
);
