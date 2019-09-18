;(function(window) {

	class Controller extends EventEmmitter {
		constructor(model, view) {
			super();
			this.model = model;
			this.view = view;

			// this.changedTasks = model.filterTasks();

			this.init(this.model, this.view);
		}

		init (model, view) {
			const state = model.getState();
			// const tasks = state.tasks;


			// const tasks = model.filterTasks(state.activeFilter);	// Нижние 3 строки можно как-то спрятать в метод filterTasks
			// this.view.filterTasks(state.activeFilter);	
			// if (tasks) view.renderTasks(tasks, 'old');	// Первый рендер должен отрисовывать сверху вниз
			
			this.filterTasks(state.activeFilter);


			// view.renderTotalTasksNumber(state.tasks.length);
			// view.renderTotalTasksNumber(tasks.length);

			model.on('change', function() {
				saveInLocalStorage('state', state);
				view.renderTotalTasksNumber(state.tasks.length);
			});
			view.on('add', this.addTask.bind(this));	// Передаю callback
			view.on('remove', this.removeTask.bind(this));	
			view.on('complete', this.completeTask.bind(this));	
			view.on('edit', this.editTask.bind(this));
			view.on('filter', this.filterTasks.bind(this));
			// view.on('sort', this.sortTasks.bind(this));
		}

		addTask (taskInfo) {	// title -придёт из View (желательно передавать объект, но пока просто строка)
			let task = this.model.addTask({
				id: Date.now(),
				title: taskInfo.title,
				isCompleted: false,
			});
			this.view.addTask(task, this.model.getState().activeSort);

			// this.view.filterTasks(this.model.getState().activeFilter);

			// this.model.filterTasks(this.model.getState().activeFilter);
			// this.view.renderTasks(this.model.filterTasks());	// Перерендериваю
			// this.view.renderTasks(this.model.sortTasks());	// Перерендериваю
		}

		removeTask (taskInfo) {
			this.model.removeTask(taskInfo.id);
			this.view.removeTask(taskInfo.elem);
		}

		completeTask (taskInfo) {
			this.model.completeTask(taskInfo.id);
			this.view.completeTask(taskInfo.elem, taskInfo.isCompleted);
			this.view.filterTasks(this.model.getState().activeFilter);
		}

		editTask (taskInfo) {
			this.model.editTask(taskInfo.id, taskInfo.title);
			this.view.editTask(taskInfo.elem, taskInfo.title);
		}

		filterTasks (type) {
			const tasks = this.model.filterTasks(type);
			
			this.view.filterTasks(tasks, type);
			this.view.renderTotalTasksNumber(tasks.length);
		}



		// filterTasks (type) {
		// 	this.model.filterTasks(type);
		// 	this.view.filterTasks(type);
		// }


		// sortTasks (type) {
		// 	this.model.sortTasks(type);
		// 	this.view.sortTasks(type);
		// }

	}

	window.Controller = Controller;

})(window);





























// ;(function(window) {

// 	class Controller extends EventEmmitter {
// 		constructor(model, view) {
// 			super();
// 			this.model = model;
// 			this.view = view;

// 			// this.changedTasks = model.filterTasks();

// 			this.init(this.model, this.view);
// 		}

// 		init (model, view) {
// 			const state = model.getState();
// 			const tasks = state.tasks;
// 			// const tasks = model.filterTasks();

// 			// if (tasks) view.renderTasks(tasks, 'old');	// Первый рендер должен отрисовывать сверху вниз
// 			if (tasks) view.sortTasks(tasks, state.activeSort);	// Первый рендер должен отрисовывать сверху вниз
// 			view.renderTotalTasksNumber(tasks.length);
// 			view.filterTasks(state.activeFilter);

// 			model.on('change', function() {
// 				saveInLocalStorage('state', state);
// 				view.renderTotalTasksNumber(state.tasks.length);
// 			});
// 			view.on('add', this.addTask.bind(this));	// Передаю callback
// 			view.on('remove', this.removeTask.bind(this));	
// 			view.on('complete', this.completeTask.bind(this));	
// 			view.on('edit', this.editTask.bind(this));
// 			view.on('filter', this.filterTasks.bind(this));
// 			view.on('sort', this.sortTasks.bind(this));
// 		}

// 		addTask (taskInfo) {	// title -придёт из View (желательно передавать объект, но пока просто строка)
// 			let task = this.model.addTask({
// 				id: Date.now(),
// 				title: taskInfo.title,
// 				isCompleted: false,
// 			});
// 			this.view.addTask(task, this.model.getState().activeSort);

// 			// this.model.filterTasks()
// 			this.view.filterTasks(this.model.getState().activeFilter);
// 			// this.view.renderTasks(this.model.filterTasks());	// Перерендериваю
// 			// this.view.renderTasks(this.model.sortTasks());	// Перерендериваю
// 		}

// 		removeTask (taskInfo) {
// 			this.model.removeTask(taskInfo.id);
// 			this.view.removeTask(taskInfo.elem);
// 		}

// 		completeTask (taskInfo) {
// 			this.model.completeTask(taskInfo.id);
// 			this.view.completeTask(taskInfo.elem, taskInfo.isCompleted);
// 			this.view.filterTasks(this.model.getState().activeFilter);
// 		}

// 		editTask (taskInfo) {
// 			this.model.editTask(taskInfo.id, taskInfo.title);
// 			this.view.editTask(taskInfo.elem, taskInfo.title);
// 		}

// 		filterTasks (type) {
// 			this.model.filterTasks(type);
// 			this.view.filterTasks(type);
// 		}

// 		sortTasks (type) {
// 			const tasks = this.model.sortTasks(type);
// 			this.view.sortTasks(tasks, type);
// 		}

// 	}

// 	window.Controller = Controller;

// })(window);
