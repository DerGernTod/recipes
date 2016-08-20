import ReactDOM from 'react-dom';
import React from 'react';
import AuthStore from './stores/AuthStore.jsx';
import {Route, IndexRoute, Link, browserHistory, Router} from 'react-router';
import LoginPage from './pages/LoginPage.jsx';
import {Container, AdminContainer} from './components/Container.jsx';
import {AdminRecipesIdPage, AdminRecipesLatestPage, AdminRecipesPage, AdminRecipesSearchPage} from './pages/admin/AdminRecipes.jsx';
import {AdminIngredientsIdPage, AdminIngredientsLatestPage, AdminIngredientsPage, AdminIngredientsSearchPage} from './pages/admin/AdminIngredients.jsx';
import {AdminTagsIdPage, AdminTagsLatestPage, AdminTagsPage, AdminTagsSearchPage} from './pages/admin/AdminTags.jsx';
import RecipePage from './pages/RecipePage.jsx';
import RecipeGridPage from './pages/RecipeGridPage.jsx';
import RecipeListPage from './pages/RecipeListPage.jsx';
import RandomRecipePage from './pages/RandomRecipePage.jsx';
import IngredientSearchPage from './pages/IngredientSearchPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function requireAuth(nextState, replace){
    if(!AuthStore.loggedIn()){
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

var routes = (
    <Router history={browserHistory}>
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
