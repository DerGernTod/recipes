(function initRecipeApp(recipeApp) {
  document.addEventListener('DOMContentLoaded', function addInitListener() {
    ng.platformBrowserDynamic.bootstrap(recipeApp.AppComponent);
  });
})(window.recipeApp || (window.recipeApp = {}));
