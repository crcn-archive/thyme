var beanpole = require('beanpole'),
router = beanpole.router(),
celeri = require('celeri');

router.require('hook.core','hook.http.mesh');
                                    
router.on({ 
	
	/**
	 */
	
	'push -public thyme/ready': function()
	{
		console.log('Thyme is ready. Fire up the worker!');
		
		this.from.push('thyme/worker', { max: 10, channel: '/hello/worker' });
	},
	
	/**
	 */ 
	
	'push -public worker/ready': function()
	{
		console.log('Worker ready! Starting to work. Start typing some stuff to blast off (e.g: message "hello world!")');
		                                                                                  
	}
	
});

celeri.on({
   
	/**
	 */                                                                                          
	
   	'message :message OR message :message :timeout': function(data)
	{                                                                                                                          
		router.push('thyme/enqueue', { channel: '/hello/worker', data: data.message, sendAt: Date.now() + (Number(data.timeout) || 0) });
	}
});  


celeri.open();
                    
router.push('set/id', 'test');
router.push('init');