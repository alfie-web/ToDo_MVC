



// Фильтр во View
;(function(window) {

	class Controller {
		constructor(model, view, api) {
			this.model = model;
			this.view = view;
			this.api = api;

			this.init(this.model, this.view, this.api);
		}

		init (model, view, api) {
			const state = model.getState();
			// const tasks = state.tasks;
			this.api.getTasks();
			// console.log(this.api);

			// if (tasks) {	// Так как запрос тасков асинхронный их не будет (надо подумать над рендером)
			// 	view.renderTasks(tasks, state.activeSort);	// Первый рендер должен отрисовывать сверху вниз
			// 	view.filterTasks(state.activeFilter);
			// 	view.sortTasks(state.activeSort);
			// }

			api.on('get', function(tasks) {
				const state = model.getState();
				model.setTasks(tasks);
				// console.log(model);
				view.renderTasks(tasks, state.activeSort);	// Первый рендер должен отрисовывать сверху вниз
				view.filterTasks(state.activeFilter);
				view.sortTasks(state.activeSort);
			});
			model.on('change', function() {
				view.renderTotalTasksNumber(state.tasks.length);
			});
			model.on('add', function(task) {
				view.addTask(task, model.getState().activeSort);
				view.filterTasks(model.getState().activeFilter);
			});

			view.on('add', this.addTask.bind(this));	
			view.on('remove', this.removeTask.bind(this));	
			view.on('complete', this.completeTask.bind(this));	
			view.on('edit', this.editTask.bind(this));
			view.on('filter', this.filterTasks.bind(this));
			view.on('sort', this.sortTasks.bind(this));
		}

		addTask (taskInfo) {	
			this.api.addTask({
				id: Date.now(),
				title: taskInfo.title,
				completed: false,
			}, this.model.addTask.bind(this.model));

			// let task = this.model.addTask({
			// 	id: Date.now(),
			// 	title: taskInfo.title,
			// 	completed: false,
			// });

			// if (task) {
			// 	// this.api.addTask(task);		// А вообще убрать всю эту тему надо, по идее api это и есть наша медель, её надо переделать, теперь все взаимодействия будут происходить с сервером
			// 	// console.log(this.model.getState());

			// 	// this.view.addTask(task, this.model.getState().activeSort);
			// 	// this.view.filterTasks(this.model.getState().activeFilter);	// Перефильтровываю
			// } else {
			// 	alert('Превышен лимит');	// Сделать кастомный попап (точнее алерты) во View для таких случаев
			// }



		}

		removeTask (taskInfo) {
			this.model.removeTask(taskInfo.id);
			this.view.removeTask(taskInfo.elem);
		}

		completeTask (taskInfo) {
			this.model.completeTask(taskInfo.id);
			this.view.completeTask(taskInfo.elem, taskInfo.completed);

			this.view.filterTasks(this.model.getState().activeFilter);	// Перефильтровываю
		}

		editTask (taskInfo) {
			this.model.editTask(taskInfo.id, taskInfo.title);
			this.view.editTask(taskInfo.elem, taskInfo.title);
		}

		filterTasks (type) {
			this.model.filterTasks(type);
			this.view.filterTasks(type);
		}

		sortTasks (type) {
			this.model.sortTasks(type);
			this.view.sortTasks(type);
			this.view.renderTasks(this.model.getState().tasks, type);
			this.view.filterTasks(this.model.getState().activeFilter);
		}
	}

	window.Controller = Controller;

})(window);









































// // Фильтр во View
// ;(function(window) {

// 	class Controller {
// 		constructor(model, view, api) {
// 			this.model = model;
// 			this.view = view;
// 			this.api = api;

// 			this.init(this.model, this.view, this.api);
// 		}

// 		init (model, view, api) {
// 			const state = model.getState();
// 			// const tasks = state.tasks;
// 			this.api.getTasks();
// 			// console.log(this.api);

// 			// if (tasks) {	// Так как запрос тасков асинхронный их не будет (надо подумать над рендером)
// 			// 	view.renderTasks(tasks, state.activeSort);	// Первый рендер должен отрисовывать сверху вниз
// 			// 	view.filterTasks(state.activeFilter);
// 			// 	view.sortTasks(state.activeSort);
// 			// }

// 			api.on('get', function(tasks) {
// 				const state = model.getState();
// 				model.setTasks(tasks);
// 				// console.log(model);
// 				view.renderTasks(tasks, state.activeSort);	// Первый рендер должен отрисовывать сверху вниз
// 				view.filterTasks(state.activeFilter);
// 				view.sortTasks(state.activeSort);
// 			});
// 			model.on('change', function() {
// 				// saveInLocalStorage('state', state);
// 				view.renderTotalTasksNumber(state.tasks.length);
// 			});
// 			view.on('add', this.addTask.bind(this));	
// 			view.on('remove', this.removeTask.bind(this));	
// 			view.on('complete', this.completeTask.bind(this));	
// 			view.on('edit', this.editTask.bind(this));
// 			view.on('filter', this.filterTasks.bind(this));
// 			view.on('sort', this.sortTasks.bind(this));
// 		}

// 		addTask (taskInfo) {	
// 			let task = this.model.addTask({
// 				id: Date.now(),
// 				title: taskInfo.title,
// 				completed: false,
// 			});

// 			if (task) {
// 				this.api.addTask(task);		// А вообще убрать всю эту тему надо, по идее api это и есть наша медель, её надо переделать, теперь все взаимодействия будут происходить с сервером
// 				console.log(this.model.getState());

// 				this.view.addTask(task, this.model.getState().activeSort);
// 				this.view.filterTasks(this.model.getState().activeFilter);	// Перефильтровываю
// 			} else {
// 				alert('Превышен лимит');	// Сделать кастомный попап (точнее алерты) во View для таких случаев
// 			}

// 		}

// 		removeTask (taskInfo) {
// 			this.model.removeTask(taskInfo.id);
// 			this.view.removeTask(taskInfo.elem);
// 		}

// 		completeTask (taskInfo) {
// 			this.model.completeTask(taskInfo.id);
// 			this.view.completeTask(taskInfo.elem, taskInfo.completed);

// 			this.view.filterTasks(this.model.getState().activeFilter);	// Перефильтровываю
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
// 			this.model.sortTasks(type);
// 			this.view.sortTasks(type);
// 			this.view.renderTasks(this.model.getState().tasks, type);
// 			this.view.filterTasks(this.model.getState().activeFilter);
// 		}
// 	}

// 	window.Controller = Controller;

// })(window);


































// Current
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

// 			this.filterTasks(state.activeFilter);
// 			this.sortTasks(state.activeSort);

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

// 			this.view.renderTasks(this.model.filterTasks(this.model.getState().activeFilter), this.model.getState().activeSort);	// Перерендериваю
// 			this.view.renderTotalTasksNumber(this.model.getState().filteredTasks.length);
// 			// this.filterTasks(this.model.getState().activeFilter);	// Можно и так (но лишние операции)
// 		}

// 		removeTask (taskInfo) {
// 			this.model.removeTask(taskInfo.id);
// 			this.view.removeTask(taskInfo.elem);
// 		}

// 		completeTask (taskInfo) {
// 			this.model.completeTask(taskInfo.id);
// 			this.view.completeTask(taskInfo.elem, taskInfo.isCompleted);

// 			this.view.renderTasks(this.model.filterTasks(this.model.getState().activeFilter), this.model.getState().activeSort);	// Перерендериваю
// 			// this.filterTasks(this.model.getState().activeFilter);	// Можно и так (но лишние операции)
// 		}

// 		editTask (taskInfo) {
// 			this.model.editTask(taskInfo.id, taskInfo.title);
// 			this.view.editTask(taskInfo.elem, taskInfo.title);
// 		}

// 		filterTasks (type) {
// 			const tasks = this.model.filterTasks(type);
			
// 			this.view.filterTasks(type);
// 			this.view.renderTasks(tasks, this.model.getState().activeSort);
// 			this.view.renderTotalTasksNumber(tasks.length);
// 		}

// 		sortTasks (type) {
// 			this.model.sortTasks(type);
// 			this.view.sortTasks(type);
// 			this.view.renderTasks(this.model.getState().filteredTasks, type);
// 			this.view.renderTotalTasksNumber(this.model.getState().filteredTasks.length);
// 		}
// 	}

// 	window.Controller = Controller;

// })(window);

