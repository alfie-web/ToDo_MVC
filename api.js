
;(function(window) {

	class Api extends EventEmmitter {
		constructor() {
			super();

			if (Api.exists) {	// Более крутой singleton (без глобальных переменных)
				return Api.instance;
			}
			Api.instance = this;
			Api.exists = true;	
		}

		getTasks () {
			let self = this;
			Http.BaseUrl = 'https://jsonplaceholder.typicode.com/';
			Http.Get('todos', function(error, response) {
				// console.log(response);
				self.emit('get', response);
				// return response;
			});
		}

		addTask (task, callback) {
			let self = this;
			Http.BaseUrl = 'https://jsonplaceholder.typicode.com/';
			Http.Post('todos', task, function(error, response) {
				// console.log(response);
				callback(response);
				// self.emit('get', response);
				// return response;
			});
		}
	}

	window.Api = Api;

})(window);

