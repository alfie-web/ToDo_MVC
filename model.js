;(function(window) {

	class Model extends EventEmmitter{
		constructor(initialState) {
			super();
			this._state = initialState;

			this._state.tasksLimit = 100;

			this._state.activeFilter = initialState.activeFilter || 'all';	// all, active, completed

			// this._state.activeFilter = 'all';	// all, active, completed
			this._state.activeSort = initialState.activeSort || 'old';	// new, old

			this._state.filteredTasks = undefined;

			// Сделать чтото типа this.emit('init', {filter: this._state.activeFilter});
			
			// this._state.totalTasksNum = this._state.tasks.length;
			// this._state.totalActiveTasksNum = 
			// this._state.totalCompletedTasksNum = 
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
			// if (task) task.isEditing = !task.isEditing;
			this.emit('change');
		}



		filterTasks (type) {
			this._state.activeFilter = type;
	
			// let tasks = this._state.filteredTasks || this._state.tasks;
			let tasks = this._state.tasks;	// Current
			// let tasks = this.sortTasks(this._state.activeSort);

			if (type === 'all') {
				// this._state.filteredTasks = this._state.tasks;
				this._state.filteredTasks = tasks;
				this.emit('change');
				return tasks;	// Возможно здесь надо сортировать
				// return this._state.tasks;	// Возможно здесь надо сортировать
			} else if (type === 'active') {
				// let tasks = this.sortTasks(this._state.activeSort);
				this._state.filteredTasks = tasks.filter(task => !task.isCompleted);
				this.emit('change');
				return this._state.filteredTasks;
			} else if (type === 'completed') {
				// let tasks = this.sortTasks(this._state.activeSort);
				this._state.filteredTasks = tasks.filter(task => task.isCompleted);
				this.emit('change');
				return this._state.filteredTasks;
			} 
			// else if (type === 'new') {
			// 	this._state.filteredTasks = this._state.tasks;
			// 	this.emit('change');
			// 	return this._state.tasks;
			// } else if (type === 'old') {
			// 	this._state.filteredTasks = this._state.tasks;
			// 	this.emit('change');
			// 	return this._state.tasks;
			// }
		}

		sortTasks (type) {
			this._state.activeSort = type;
			// let tasks = this._state.filteredTasks || this._state.tasks;
			// // // let tasks = this.filterTasks(this._state.activeFilter);

			// if (type === 'new') {
			// 	let tasksCopy = [...tasks];
			// 	this.emit('change');
			// 	return tasksCopy.reverse();
			// } else if (type === 'old') {
				this.emit('change');
			// 	return tasks;
			// }
		}







		// filterTasks (type) {
		// 	this._state.activeFilter = type;
		// }

		// sortTasks (type) {
		// 	this._state.activeSort = type;
		// }


		// --- Фильтрация и сортировка ---
		// filterTasks () {
		// 	if (this._state.activeFilter === 'all') {
		// 		return this._state.tasks;
		// 	} else if (this._state.activeFilter === 'active') {
		// 		return this._state.tasks.filter(task => !task.isCompleted);
		// 	} else if (this._state.activeFilter === 'completed') {
		// 		return this._state.tasks.filter(task => task.isCompleted);
		// 	}
		// }

		// setActiveFilter (type) {
		// 	this._state.activeFilter = type;
		// }

		// sortTasks () {
		// 	if (this._state.activeSort === 'new') {
		// 		return this._state.tasks;
		// 	} else if (this._state.activeSort === 'old') {
		// 		const tasksCopy = [...this._state.tasks];
		// 		return tasksCopy.reverse();
		// 	}
		// }

		// setActiveSort (type) {
		// 	this._state.activeSort = type;
		// }
	}

	window.Model = Model;

})(window);

























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
			
// 			// if (this._state.activeSort === 'new') {
// 			// 	this._state.tasks.unshift(item);	
// 			// } else if (this._state.activeSort === 'old') {
// 				this._state.tasks.push(item);	
// 			// }

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
	
// 			// let tasks = this._state.filteredTasks || this._state.tasks;
// 			let tasks = this._state.tasks;	// Current
// 			// let tasks = this.sortTasks(this._state.activeSort);

// 			if (type === 'all') {
// 				// this._state.filteredTasks = this._state.tasks;
// 				this._state.filteredTasks = tasks;
// 				this.emit('change');
// 				return tasks;	// Возможно здесь надо сортировать
// 				// return this._state.tasks;	// Возможно здесь надо сортировать
// 			} else if (type === 'active') {
// 				// let tasks = this.sortTasks(this._state.activeSort);
// 				this._state.filteredTasks = tasks.filter(task => !task.isCompleted);
// 				this.emit('change');
// 				return this._state.filteredTasks;
// 			} else if (type === 'completed') {
// 				// let tasks = this.sortTasks(this._state.activeSort);
// 				this._state.filteredTasks = tasks.filter(task => task.isCompleted);
// 				this.emit('change');
// 				return this._state.filteredTasks;
// 			} 
// 			// else if (type === 'new') {
// 			// 	this._state.filteredTasks = this._state.tasks;
// 			// 	this.emit('change');
// 			// 	return this._state.tasks;
// 			// } else if (type === 'old') {
// 			// 	this._state.filteredTasks = this._state.tasks;
// 			// 	this.emit('change');
// 			// 	return this._state.tasks;
// 			// }
// 		}

// 		// sortTasks (type) {
// 		// 	this._state.activeSort = type;
// 		// 	let tasks = this._state.filteredTasks || this._state.tasks;
// 		// 	// // let tasks = this.filterTasks(this._state.activeFilter);

// 		// 	if (type === 'new') {
// 		// 		let tasksCopy = [...tasks];
// 		// 		this.emit('change');
// 		// 		return tasksCopy.reverse();
// 		// 	} else if (type === 'old') {
// 		// 		this.emit('change');
// 		// 		return tasks;
// 		// 	}
// 		// }







// 		// filterTasks (type) {
// 		// 	this._state.activeFilter = type;
// 		// }

// 		// sortTasks (type) {
// 		// 	this._state.activeSort = type;
// 		// }


// 		// --- Фильтрация и сортировка ---
// 		// filterTasks () {
// 		// 	if (this._state.activeFilter === 'all') {
// 		// 		return this._state.tasks;
// 		// 	} else if (this._state.activeFilter === 'active') {
// 		// 		return this._state.tasks.filter(task => !task.isCompleted);
// 		// 	} else if (this._state.activeFilter === 'completed') {
// 		// 		return this._state.tasks.filter(task => task.isCompleted);
// 		// 	}
// 		// }

// 		// setActiveFilter (type) {
// 		// 	this._state.activeFilter = type;
// 		// }

// 		// sortTasks () {
// 		// 	if (this._state.activeSort === 'new') {
// 		// 		return this._state.tasks;
// 		// 	} else if (this._state.activeSort === 'old') {
// 		// 		const tasksCopy = [...this._state.tasks];
// 		// 		return tasksCopy.reverse();
// 		// 	}
// 		// }

// 		// setActiveSort (type) {
// 		// 	this._state.activeSort = type;
// 		// }
// 	}

// 	window.Model = Model;

// })(window);




























// ;(function(window) {

// 	class Model extends EventEmmitter{
// 		constructor(initialState) {
// 			super();
// 			this._state = initialState;

// 			this._state.tasksLimit = 100;
// 			this._state.activeFilter = 'all';	// all, active, completed
// 			this._state.activeSort = 'old';	// new, old

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
			
// 			if (this._state.activeSort === 'new') {
// 				this._state.tasks.unshift(item);	
// 			} else if (this._state.activeSort === 'old') {
// 				this._state.tasks.push(item);	
// 			}

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
// 		}

// 		sortTasks (type) {
// 			this._state.activeSort = type;
// 			this.emit('change');

// 			if (type === 'new') {
// 				return this._state.tasks;
// 			} else if (type === 'old') {
// 				const tasks = [...this._state.tasks];
// 				return tasks.reverse();
// 			}
// 		}


// 		// --- Фильтрация и сортировка ---
// 		// filterTasks () {
// 		// 	if (this._state.activeFilter === 'all') {
// 		// 		return this._state.tasks;
// 		// 	} else if (this._state.activeFilter === 'active') {
// 		// 		return this._state.tasks.filter(task => !task.isCompleted);
// 		// 	} else if (this._state.activeFilter === 'completed') {
// 		// 		return this._state.tasks.filter(task => task.isCompleted);
// 		// 	}
// 		// }

// 		// setActiveFilter (type) {
// 		// 	this._state.activeFilter = type;
// 		// }

// 		// sortTasks () {
// 		// 	if (this._state.activeSort === 'new') {
// 		// 		return this._state.tasks;
// 		// 	} else if (this._state.activeSort === 'old') {
// 		// 		const tasksCopy = [...this._state.tasks];
// 		// 		return tasksCopy.reverse();
// 		// 	}
// 		// }

// 		// setActiveSort (type) {
// 		// 	this._state.activeSort = type;
// 		// }
// 	}

// 	window.Model = Model;

// })(window);

