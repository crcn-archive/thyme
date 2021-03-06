var beanpoll = require('beanpoll'),
plugin = require('plugin'),
router = beanpoll.router(),
loader = plugin.loader(),
celeri = require('celeri');

loader.
options(router, true).
require({
	daisy: {
		remoteName: 'thyme-test',
		transport: {
			rabbitmq: {
				host: 'localhost'
			}
		}
	}
}).init();


                                    
router.on({ 
	
	/**
	 */
	
	'push -hook thyme/ready': function()
	{
		console.log('Thyme is ready. Fire up the worker!');
		
		this.from.push('thyme/worker', { queue: 'thyme-worker', max: 20, path: '/hello/worker' });
	},
	
	/**
	 */ 
	
	'push -hook thyme-worker/ready': function()
	{
		console.log('Worker ready! Starting to work. Start typing some stuff to blast off (e.g: message "hello world!")');
		                                                                                  
	}
	
});

celeri.onCommand({
   
	/**
	 */                                                                                          
	
   	'message :message OR message :message :timeout': function(data)
	{                                                                                                                      
		router.push('thyme/enqueue', { queue:'thyme-worker', path: '/hello/worker', data: data.message, sendAt: Date.now() + (Number(data.timeout) || 0) });
	}
});  



celeri.open();                   
router.push('init');