require('./index');


var beanpole = require('beanpole'),
router = beanpole.router();
                                      
require.paths.unshift(__dirname + '/../node_modules');

router.require(__dirname + '/../package.json').
require('thyme.core','hook.core','hook.http.mesh');              

router.push('init');