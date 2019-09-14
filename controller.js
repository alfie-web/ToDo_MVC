;(function(window) {

	class Controller extends EventEmmitter {
		constructor(model, view) {
			super();
			this.model = model;
			this.view = view;

			this.init(this.model, this.view);
		}

		init (model, view) {
			const state = model.getState();
			const tasks = model.filterTasks();

			if (tasks) view.renderTasks(tasks);	// Передать задачи
			view.renderTotalTasksNumber(tasks.length);

			model.on('change', function() {
				saveInLocalStorage('state', state);
				view.renderTotalTasksNumber(state.tasks.length);
			});
			view.on('add', this.addTask.bind(this));	// Передаю callback
			view.on('remove', this.removeTask.bind(this));	
			view.on('complete', this.completeTask.bind(this));	
			view.on('edit', this.editTask.bind(this));
			view.on('filter', this.filterTasks.bind(this));
		}

		addTask (taskInfo) {	// title -придёт из View (желательно передавать объект, но пока просто строка)
			let task = this.model.addTask({
				id: Date.now(),
				title: taskInfo.title,
				isCompleted: false
			});
			this.view.addTask(task);
		}

		removeTask (taskInfo) {
			this.model.removeTask(taskInfo.id);
			this.view.removeTask(taskInfo.elem);
		}

		completeTask (taskInfo) {
			this.model.completeTask(taskInfo.id);
			this.view.completeTask(taskInfo.elem, taskInfo.isCompleted);
		}

		editTask (taskInfo) {
			this.model.editTask(taskInfo.id, taskInfo.title);
			this.view.editTask(taskInfo.elem, taskInfo.title);
		}


		filterTasks (type) {
			this.model.setActiveFilter(type);
			const tasks = this.model.filterTasks();
			this.view.renderTasks(tasks);
		}

	}

	window.Controller = Controller;

})(window);






















// ;(function(window) {

// 	class Controller extends EventEmmitter {
// 		constructor(model, view) {
// 			super();
// 			this.model = model;
// 			this.view = view;

// 			this.init(this.model, this.view);
// 		}

// 		init (model, view) {
// 			const state = model.getState();
// 			const tasks = state.tasks;

// 			if (tasks) view.renderTasks(tasks);	// Передать задачи
// 			view.renderTotalTasksNumber(tasks.length);
			
// 			model.on('change', function() {
// 				saveInLocalStorage('state', state);
// 				view.renderTotalTasksNumber(state.tasks.length);
// 			});
// 			view.on('add', this.addTask.bind(this));	// Передаю callback
// 			view.on('remove', this.removeTask.bind(this));	
// 			view.on('complete', this.completeTask.bind(this));	
// 			view.on('edit', this.editTask.bind(this));	
// 			// view.on('edited', this.editedTask.bind(this));	
// 		}

// 		addTask (taskInfo) {	// title -придёт из View (желательно передавать объект, но пока просто строка)
// 			let task = this.model.addTask({
// 				id: Date.now(),
// 				title: taskInfo.title,
// 				isEditing: false,
// 				isCompleted: false
// 			});
// 			this.view.addTask(task);
// 		}

// 		removeTask (taskInfo) {
// 			this.model.removeTask(taskInfo.id);
// 			this.view.removeTask(taskInfo.elem);
// 		}

// 		completeTask (taskInfo) {
// 			this.model.completeTask(taskInfo.id);
// 			this.view.completeTask(taskInfo.elem, taskInfo.isCompleted);
// 		}

// 		editTask (taskInfo) {
// 			this.model.editTask(taskInfo.id, taskInfo.title);
// 			this.view.editTask(taskInfo.elem, taskInfo.title);
// 		}

// 	}

// 	window.Controller = Controller;

// })(window);
























// ;(function(window) {

// 	class Controller extends EventEmmitter {
// 		constructor(model, view) {
// 			super();
// 			this.model = model;
// 			this.view = view;

// 			this.init(this.model, this.view);
// 		}

// 		init (model, view) {
// 			const state = model.getState();
// 			const tasks = state.tasks;

// 			if (tasks) view.renderTasks(tasks);	// Передать задачи
// 			view.renderTotalTasksNumber(tasks.length);
			
// 			model.on('change', function() {
// 				saveInLocalStorage('state', state);
// 				view.renderTotalTasksNumber(state.tasks.length);
// 			});
// 			view.on('add', this.addTask.bind(this));	// Передаю callback
// 			view.on('remove', this.removeTask.bind(this));	
// 			view.on('complete', this.completeTask.bind(this));	
// 			view.on('edit', this.editTask.bind(this));	
// 			view.on('edited', this.editedTask.bind(this));	
// 		}

// 		addTask (taskInfo) {	// title -придёт из View (желательно передавать объект, но пока просто строка)
// 			let task = this.model.addTask({
// 				id: Date.now(),
// 				title: taskInfo.title,
// 				isEditing: false,
// 				isCompleted: false
// 			});
// 			this.view.addTask(task);
// 		}

// 		removeTask (taskInfo) {
// 			this.model.removeTask(taskInfo.id);
// 			this.view.removeTask(taskInfo.elem);
// 		}

// 		completeTask (taskInfo) {
// 			this.model.completeTask(taskInfo.id);
// 			this.view.completeTask(taskInfo.elem, taskInfo.isCompleted);
// 		}

// 		editTask (taskInfo) {
// 			// this.model.editTask(taskInfo.id);
// 			this.view.editTask(taskInfo.elem, taskInfo.isEditing, taskInfo.id);
// 		}

// 		editedTask (taskInfo) {
// 			this.model.editTask(taskInfo.id, taskInfo.title);
// 			// this.view.editedTask(taskInfo.elem, taskInfo.title);
// 		}
// 	}

// 	window.Controller = Controller;

// })(window);