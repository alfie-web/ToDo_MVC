
// // Current
// ;(function(window) {

// 	class Model extends EventEmmitter{
// 		constructor(initialState) {
// 			super();
// 			this._state = initialState;

// 			this._state.tasksLimit = 100;

// 			this._state.activeFilter = initialState.activeFilter || 'all';	// all, active, completed

// 			// this._state.activeFilter = 'all';	// all, active, completed
// 			this._state.activeSort = initialState.activeSort || 'old';	// new, old

// 			this._state.filteredTasks = undefined;

// 			// Сделать чтото типа this.emit('init', {filter: this._state.activeFilter});
			
// 			// this._state.totalTasksNum = this._state.tasks.length;
// 			// this._state.totalActiveTasksNum = 
// 			// this._state.totalCompletedTasksNum = 
// 		}

// 		getState () {
// 			return this._state;
// 		}

// 		// --- Основные операции с задачей ---
// 		addTask (item) {
// 			if (this._state.tasks.length > this._state.tasksLimit) return; //Максимум 100 задач
			
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

// 		editTask (id, title) {
// 			const task = this._state.tasks.find(el => el.id == id);

// 			if (task) task.title = title;
// 			// if (task) task.isEditing = !task.isEditing;
// 			this.emit('change');
// 		}

// 		filterTasks (type) {
// 			this._state.activeFilter = type;

// 			let tasks = this._state.tasks;	// Current

// 			if (type === 'all') {
// 				this._state.filteredTasks = tasks;
// 				this.emit('change');
// 				return tasks;	
// 			} else if (type === 'active') {
// 				this._state.filteredTasks = tasks.filter(task => !task.isCompleted);
// 				this.emit('change');
// 				return this._state.filteredTasks;
// 			} else if (type === 'completed') {
// 				this._state.filteredTasks = tasks.filter(task => task.isCompleted);
// 				this.emit('change');
// 				return this._state.filteredTasks;
// 			}
// 		}

// 		sortTasks (type) {
// 			this._state.activeSort = type;

// 			this.emit('change');
// 		}
// 	}

// 	window.Model = Model;

// })(window);









































;(function(window) {

	class Model extends EventEmmitter{
		constructor(initialState) {
			super();
			this._state = initialState;

			this._state.tasksLimit = 10;
			this._state.activeFilter = initialState.activeFilter || 'all';	// all, active, completed
			this._state.activeSort = initialState.activeSort || 'old';	// new, old
		}

		getState () {
			return this._state;
		}

		// --- Основные операции с задачей ---
		addTask (item) {
			if (this._state.tasks.length > this._state.tasksLimit) return; //Максимум 100 задач
			
			// if (this._state.activeSort === 'new') {
			// 	this._state.tasks.unshift(item);	
			// } else if (this._state.activeSort === 'old') {
				this._state.tasks.push(item);	
			// }

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
			this.emit('change');
		}

		filterTasks (type) {
			this._state.activeFilter = type;

			this.emit('change');
		}

		sortTasks (type) {
			this._state.activeSort = type;

			this.emit('change');
		}
	}

	window.Model = Model;

})(window);

