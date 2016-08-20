import React from 'react';
import Reflux from 'reflux';
var AuthActions = Reflux.createActions({
    login : { children: ['completed', 'failed']},
    logout : {}
});
export default AuthActions; 