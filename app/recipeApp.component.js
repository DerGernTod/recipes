(function initComponent(recipeApp) {
  recipeApp.AppComponent =
    ng.core.Component({
      selector: 'recipe-app',
      template: '<h1>My blub Angular 2 App</h1>'
    })
    .Class({
      constructor: function constructor() {
      },
      blub: function blub() {

      }
    });
})(window.recipeApp || (window.recipeApp = {}));