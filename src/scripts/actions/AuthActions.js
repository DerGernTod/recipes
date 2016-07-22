var AuthActions = Reflux.createActions({
    login : { children: ['completed', 'failed']},
    logout : {}
});