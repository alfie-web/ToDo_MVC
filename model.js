;(function(window) {

	class Model extends EventEmmitter{
		constructor(initialState) {
			super();
			this._state = initialState;

			this._state.tasksLimit = 100;
			this._state.activeFilter = 'all';	// all, active, completed

			// this._state.totalTasksNum = this._state.tasks.length;
			// this._state.totalActiveTasksNum = 
			// this._state.totalCompletedTasksNum = 
		}

		getState () {
			return this._state;
		}

		// --- Основные операции с задачей ---
		addTask (item) {
			if (this._state.tasks.length <= this._state.tasksLimit) this._state.tasks.push(item);	//Максимум 100 задач

			this.emit('change');
			return item;
		}

		removeTask (id) {
			const index = this._state.tasks.findIndex(el => el.id == id);	// Можно вынести в отдельный метод
			
			this._state.tasks.splice(index, 1);
			this.emit('change');
		}

		completeTask (id) {
			const task = this._state.tasks.find(el => el.id == id);

			if (task) task.isCompleted = !task.isCompleted;
			this.emit('change');
		}

		editTask (id, title) {
			const task = this._state.tasks.find(el => el.id == id);

			if (task) task.title = title;
			// if (task) task.isEditing = !task.isEditing;
			this.emit('change');
		}


		// --- Фильтрация и сортировка ---
		filterTasks () {
			if (this._state.activeFilter === 'all') {
				return this._state.tasks;
			} else if (this._state.activeFilter === 'active') {
				return this._state.tasks.filter(task => !task.isCompleted);
			} else if (this._state.activeFilter === 'completed') {
				return this._state.tasks.filter(task => task.isCompleted);
			}
		}

		setActiveFilter (type) {
			this._state.activeFilter = type;
		}
	}


	window.Model = Model;

})(window);
























// ;(function(window) {

// 	class Model extends EventEmmitter{
// 		constructor(initialState) {
// 			super();
// 			this._state = initialState;

// 			// this._state.totalTasksNum = this._state.tasks.length;
// 			// this._state.totalActiveTasksNum = 
// 			// this._state.totalCompletedTasksNum = 
// 		}

// 		getState () {
// 			return this._state;
// 		}

// 		addTask (item) {
// 			this._state.tasks.push(item);

// 			this.emit('change');
// 			return item;
// 		}

// 		removeTask (id) {
// 			const index = this._state.tasks.findIndex(el => el.id == id);	// Можно вынести в отдельный метод
			
// 			this._state.tasks.splice(index, 1);
// 			this.emit('change');
// 		}

// 		completeTask (id) {
// 			const task = this._state.tasks.find(el => el.id == id);

// 			if (task) task.isCompleted = !task.isCompleted;
// 			this.emit('change');
// 		}

// 		// editTask (id) {
// 		// 	const task = this._state.tasks.find(el => el.id == id);

// 		// 	if (task) task.isEditing = !task.isEditing;
// 		// 	this.emit('change');
// 		// }

// 		editTask (id, title) {
// 			const task = this._state.tasks.find(el => el.id == id);

// 			if (task) task.title = title;
// 			// if (task) task.isEditing = !task.isEditing;
// 			this.emit('change');
// 		}
// 	}


// 	window.Model = Model;

// })(window);
