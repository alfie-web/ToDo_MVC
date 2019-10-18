
;(function(window) {

	class App {
		constructor(props) {
			if (App.exists) {	// Более крутой singleton (без глобальных переменных)
				return App.instance;
			}
			App.instance = this;
			App.exists = true;

			// Http.BaseUrl = 'https://jsonplaceholder.typicode.com/';
			// this.testApiData = Http.Get('todos', function(error, response) {
			// 	console.log(response);
			// });

			// this.api = new Api;

			this.initialState = {
				// tasks: this.api.getTasks(),
				tasks: [],
				tasksLimit: props.tasksLimit || 100,
				activeFilter: props.activeFilter || 'all',	// all, active, completed
				activeSort: props.activeSort || 'new'	// new, old
			};

			// this.initialState = loadFromLocalStorage('state') || {
			// 	tasks: [	// Можно удалить, это 2 задачи по умолчанию
			// 		{id: 0, title: 'Test task1', completed: false},
			// 		{id: 1, title: 'Test task2', completed: false}
			// 	],
			// 	tasksLimit: props.tasksLimit || 100,
			// 	activeFilter: props.activeFilter || 'all',	// all, active, completed
			// 	activeSort: props.activeSort || 'new'	// new, old
			// };

			this.api = new Api;
			this.model = new Model(this.initialState);
			this.view = new View('.todos-items', '#addTodo');
			this.controller = new Controller(this.model, this.view, this.api);
		}
	}

	window.App = App;

})(window);

