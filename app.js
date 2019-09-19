
;(function(window) {
	
	class App {
		constructor(props) {
			this.initialState = loadFromLocalStorage('state') || {
				tasks: [	// Можно удалить, это 2 задачи по умолчанию
					{id: 0, title: 'Test task1', isCompleted: false},
					{id: 1, title: 'Test task2', isCompleted: false}
				],
				tasksLimit: props.tasksLimit || 100,
				activeFilter: props.activeFilter || 'all',	// all, active, completed
				activeSort: props.activeSort || 'old'	// new, old
			};

			this.model = new Model(this.initialState);
			this.view = new View('.todos-items', '#addTodo');
			this.controller = new Controller(this.model, this.view);
		}
	}

	window.App = App;

})(window);

