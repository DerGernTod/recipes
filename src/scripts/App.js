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
        <Route name="login" path="/login" component={LoginPage}/>
        <Route name="admin" path="/admin" component={AdminContainer} onEnter={requireAuth}>
            <IndexRoute component={AdminRecipesPage} />
            <Route name="adminRecipes" path="/admin/recipes" component={AdminRecipesPage}>
                <IndexRoute component={AdminRecipesLatestPage} />
                <Route name="adminRecipeLatest" path="/admin/recipes/latest" component={AdminRecipesLatestPage}/>
                <Route name="adminRecipeSearchresult" path="/admin/recipes/search/:keyword" component={AdminRecipesSearchPage}/>
                <Route name="adminRecipe" path="/admin/recipes/id/:recipeId" component={AdminRecipesIdPage}/>
            </Route>
            <Route name="adminIngredients" path="/admin/ingredients" component={AdminIngredientsPage}>
                <Route name="adminIngredient" path="/admin/ingredients/:ingredientId" component={AdminIngredientPage}/>
            </Route>
            <Route name="adminTags" path="/admin/tags" component={AdminTagsPage}>
                <Route name="adminTag" path="/admin/tags/:tagId" component={AdminTagPage}/>
            </Route>
            <Route name="adminNotFound" path="/admin/*" component={NotFoundPage}/>
        </Route>
        <Route name="container" path="/" component={Container}>
            <IndexRoute component={RecipeGridPage} />
            <Route name="list" path="/list" component={RecipeListPage}/>
            <Route name="random" path="/random" component={RandomRecipePage}/>
            <Route name="search" path="/search" component={IngredientSearchPage}/>
            <Route name="recipe" path="/recipe/:recipeId" component={RecipePage}/>
            <Route name="notFound" path="*" component={NotFoundPage} />
        </Route>
    </Router>
);
ReactDOM.render(routes,
    document.getElementById('content')
);
