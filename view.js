;(function(window, document) {

	class View extends EventEmmitter {
		constructor(tasksElemSelector, tasksFormSelector) {
			super();
			this.tasksElem = document.querySelector(tasksElemSelector);
			this.addTaskForm = document.querySelector(tasksFormSelector);
			this.addTaskInput = this.addTaskForm.querySelector('input.text');
			this.totalTasksNumElem = document.querySelector('.totalTasks');

			this.filterSelect = document.querySelector('select.tasks-filter');

			this.addNewTaskListener();
			this.filterListener(this.filterSelect);
		}

		// --- Основные обработчики ---
		addNewTaskListener() {
			const self = this;
	
			this.addTaskForm.addEventListener('submit', function(e) {
				e.preventDefault();

				if (!self.addTaskInput.value) {
					alert('Заполните полe');
					self.addTaskInput.focus();
					return;
				}

				var text = self.addTaskInput.value;
				
				self.addTaskInput.value = '';
				// Вызываю pub/sub (отдаю данные контроллеру)
				this.emit('add', {title: text});
			}.bind(this));
		}

		filterListener (select) {
			const self = this;
			select.addEventListener('change', function(e) {
				const type = e.target.selectedOptions[0].getAttribute('data-filter');
				
				self.emit('filter', type);
			});
		}


		// Даже незнаю какой вариант лучше (в первом всё по функциям распределено, а во втором всё в одной но без лишнего кода) 

		// Первый вариант
		// taskBtnsListeners (item) {	// Рефакторить (использовать data-action у кнопок, таким образом избавимся от методов removeBtnHandler и completeBtnHandler)
		// 	const removeBtn = item.querySelector('.deleteBtn');
		// 	removeBtn.addEventListener('click', this.removeBtnHandler.bind(this));

		// 	const completeBtn = item.querySelector('.completeBtn');
		// 	completeBtn.addEventListener('click', this.completeBtnHandler.bind(this));
		// 	// Ищем здесь и другие кнопки
		// }

		// // Методы похожи (надо рефакторить)
		// removeBtnHandler ({target}) {
		// 	const taskElem = target.closest('.todos-item');	
		// 	const id = taskElem.getAttribute('data-id');

		// 	this.emit('remove', {elem: taskElem, id});
		// }

		// completeBtnHandler ({target}) {
		// 	const taskElem = target.closest('.todos-item');	
		// 	const id = taskElem.getAttribute('data-id');

		// 	this.emit('complete', {elem: taskElem, id, isCompleted: taskElem.classList.contains('completed')});
		// }

		// Второй вариант
		taskBtnsListeners (item) {
			const self = this;
			const btns = item.querySelectorAll('.task-btn');

			btns.forEach(function(btn) {
				btn.addEventListener('click', function() {
					const action = this.getAttribute('data-action');
					const id = item.getAttribute('data-id');

					if (action === 'delete') {
						self.emit('remove', {elem: item, id});
					} else if (action === 'complete') {
						self.emit('complete', {elem: item, id, isCompleted: item.classList.contains('completed')});
					} else if (action === 'edit') {
						// self.emit('edit', {elem: item, id, isEditing: item.classList.contains('editing')});
						self.editTaskHandler({elem: item, id, isEditing: item.classList.contains('editing'), btn: this});
					}
				});
			});
		}

		editTaskHandler (props) {
			const input = props.elem.querySelector('input.todos-item__input');
			
			if (!props.isEditing) {
				props.elem.classList.add('editing');
				input.focus();
				// props.btn.textContent = 'save';
				props.btn.innerHTML = '<i class="fa fa-pencil-square-o"></i>';
			} else {
				props.elem.classList.remove('editing');
				// props.btn.textContent = 'edit';
				props.btn.innerHTML = '<i class="fa fa-pencil"></i>';
				this.emit('edit', {elem: props.elem, id: props.id, title: input.value});
			}
		}




		// --- Основные операции с задачей ---
		addTask (taskInfo) {	// Доработать функцию createElement
			const taskEditBtn = createElement('span', ['editBtn', 'task-btn'], {'data-action': 'edit'}, createElement('i', ['fa', 'fa-pencil']));
			const taskCompleteBtn = createElement('span', ['completeBtn', 'task-btn'], {'data-action': 'complete'}, createElement('i', ['fa', 'fa-check']));
			const taskDeleteBtn = createElement('span', ['deleteBtn', 'task-btn'], {'data-action': 'delete'}, createElement('i', ['fa', 'fa-close']));
			const taskEditInput = createElement('input', ['todos-item__input', 'hide'], {value: taskInfo.title});
			const taskEl = createElement('div', ['todos-item', taskInfo.isCompleted ? 'completed' : ''], {'data-id': taskInfo.id}, createElement('div', ['todos-item__title'], {}, taskInfo.title), taskEditInput, createElement('div', ['todos-item__actions'], {}, taskEditBtn, taskCompleteBtn, taskDeleteBtn));
			
			this.tasksElem.appendChild(taskEl);
			this.taskBtnsListeners(taskEl);
		}

		removeTask (item) {
			this.tasksElem.removeChild(item);
		}

		completeTask (item, isCompleted) {
			(!isCompleted) ? item.classList.add('completed') : item.classList.remove('completed');
		}

		editTask (item, text) {
			const title = item.querySelector('.todos-item__title');
			title.textContent = text;
		}
	


		// --- Функции рендеринга ---
		// Первый вызов должен быть в Controller-е
		renderTasks (tasks) {
			const self = this;
			this.tasksElem.innerHTML = '';

			tasks.forEach(function(task) {
				self.addTask(task);
			});
		}

		// filterTasks (type) {
		// 	const seff = this;
		// 	const all = document.querySelectorAll('.todos-item');
		// 	const active = document.querySelectorAll('.todos-item:not(.completed)');
		// 	const completed = document.querySelectorAll('.completed');
	
		// 	this.tasksElem.innerHTML = '';

		// 	if (type === 'all') {
		// 		all.forEach(function(el) {
		// 			seff.tasksElem.appendChild(el);
		// 		});
		// 	} else if (type === 'active') {
		// 		active.forEach(function(el) {
		// 			seff.tasksElem.appendChild(el);
		// 		});
		// 	} else if (type === 'completed') {
		// 		completed.forEach(function(el) {
		// 			seff.tasksElem.appendChild(el);
		// 		});
		// 	}
		// }

		renderTotalTasksNumber (num) {
			this.totalTasksNumElem.textContent = num;
		}

	}

	window.View = View;

})(window, document);
























// ;(function(window, document) {

// 	class View extends EventEmmitter {
// 		constructor(tasksElemSelector, tasksFormSelector) {
// 			super();
// 			this.tasksElem = document.querySelector(tasksElemSelector);
// 			this.addTaskForm = document.querySelector(tasksFormSelector);
// 			this.addTaskInput = this.addTaskForm.querySelector('input.text');
// 			this.totalTasksNumElem = document.querySelector('.totalTasks');

// 			this.addNewTaskListener();
			
// 		}

// 		addNewTaskListener() {
// 			const self = this;
	
// 			this.addTaskForm.addEventListener('submit', function(e) {
// 				e.preventDefault();

// 				if (!self.addTaskInput.value) {
// 					alert('Заполните полe');
// 					self.addTaskInput.focus();
// 					return;
// 				}

// 				var text = self.addTaskInput.value;
				
// 				self.addTaskInput.value = '';
// 				// Вызываю pub/sub (отдаю данные контроллеру)
// 				this.emit('add', {title: text});
// 			}.bind(this));
// 		}


// 		// Даже незнаю какой вариант лучше (в первом всё по функциям распределено, а во втором всё в одной но без лишнего кода) 

// 		// Первый вариант
// 		// taskBtnsListeners (item) {	// Рефакторить (использовать data-action у кнопок, таким образом избавимся от методов removeBtnHandler и completeBtnHandler)
// 		// 	const removeBtn = item.querySelector('.deleteBtn');
// 		// 	removeBtn.addEventListener('click', this.removeBtnHandler.bind(this));

// 		// 	const completeBtn = item.querySelector('.completeBtn');
// 		// 	completeBtn.addEventListener('click', this.completeBtnHandler.bind(this));
// 		// 	// Ищем здесь и другие кнопки
// 		// }

// 		// // Методы похожи (надо рефакторить)
// 		// removeBtnHandler ({target}) {
// 		// 	const taskElem = target.closest('.todos-item');	
// 		// 	const id = taskElem.getAttribute('data-id');

// 		// 	this.emit('remove', {elem: taskElem, id});
// 		// }

// 		// completeBtnHandler ({target}) {
// 		// 	const taskElem = target.closest('.todos-item');	
// 		// 	const id = taskElem.getAttribute('data-id');

// 		// 	this.emit('complete', {elem: taskElem, id, isCompleted: taskElem.classList.contains('completed')});
// 		// }

// 		// Второй вариант
// 		taskBtnsListeners (item) {
// 			const self = this;
// 			const btns = item.querySelectorAll('.task-btn');

// 			btns.forEach(function(btn) {
// 				btn.addEventListener('click', function() {
// 					const action = this.getAttribute('data-action');
// 					const id = item.getAttribute('data-id');

// 					if (action === 'delete') {
// 						self.emit('remove', {elem: item, id});
// 					} else if (action === 'complete') {
// 						self.emit('complete', {elem: item, id, isCompleted: item.classList.contains('completed')});
// 					} else if (action === 'edit') {
// 						// self.emit('edit', {elem: item, id, isEditing: item.classList.contains('editing')});
// 						self.editTaskHandler({elem: item, id, isEditing: item.classList.contains('editing'), btn: this});
// 					}
// 				});
// 			});
// 		}

// 		editTaskHandler (props) {
// 			const input = props.elem.querySelector('input.todos-item__input');
			
// 			if (!props.isEditing) {
// 				props.elem.classList.add('editing');
// 				input.focus();
// 				props.btn.textContent = 'save';
// 			} else {
// 				props.elem.classList.remove('editing');
// 				props.btn.textContent = 'edit';
// 				this.emit('edit', {elem: props.elem, id: props.id, title: input.value});
// 			}
// 		}





// 		addTask (taskInfo) {	// Доработать функцию createElement
// 			const taskEditBtn = createElement('span', ['editBtn', 'task-btn'], {'data-action': 'edit'}, ' edit');
// 			const taskCompleteBtn = createElement('span', ['completeBtn', 'task-btn'], {'data-action': 'complete'}, ' complete');
// 			const taskDeleteBtn = createElement('span', ['deleteBtn', 'task-btn'], {'data-action': 'delete'}, ' delete');
// 			const taskEditInput = createElement('input', ['todos-item__input', 'hide'], {value: taskInfo.title});
// 			const taskEl = createElement('div', ['todos-item', taskInfo.isCompleted ? 'completed' : ''], {'data-id': taskInfo.id}, createElement('div', ['todos-item__title'], {}, taskInfo.title), taskEditInput, createElement('div', ['todos-item__actions'], {}, taskEditBtn, taskCompleteBtn, taskDeleteBtn));
			
// 			this.tasksElem.appendChild(taskEl);
// 			this.taskBtnsListeners(taskEl);
// 		}

// 		removeTask (item) {
// 			this.tasksElem.removeChild(item);
// 		}

// 		completeTask (item, isCompleted) {
// 			(!isCompleted) ? item.classList.add('completed') : item.classList.remove('completed');
// 		}

// 		editTask (item, text) {
// 			const title = item.querySelector('.todos-item__title');
// 			title.textContent = text;
// 		}
	


// 		// Первый вызов должен быть в Controller-е
// 		renderTasks (tasks) {
// 			const self = this;

// 			tasks.forEach(function(task) {
// 				self.addTask(task);
// 			});
// 		}

// 		renderTotalTasksNumber (num) {
// 			this.totalTasksNumElem.textContent = num;
// 		}

// 	}

// 	window.View = View;

// })(window, document);



































// ;(function(window, document) {

// 	class View extends EventEmmitter {
// 		constructor(tasksElemSelector, tasksFormSelector) {
// 			super();
// 			this.tasksElem = document.querySelector(tasksElemSelector);
// 			this.addTaskForm = document.querySelector(tasksFormSelector);
// 			this.addTaskInput = this.addTaskForm.querySelector('input.text');
// 			this.totalTasksNumElem = document.querySelector('.totalTasks');

// 			this.addNewTaskListener();
			
// 		}

// 		addNewTaskListener() {
// 			const self = this;
	
// 			this.addTaskForm.addEventListener('submit', function(e) {
// 				e.preventDefault();

// 				if (!self.addTaskInput.value) {
// 					alert('Заполните полe');
// 					self.addTaskInput.focus();
// 					return;
// 				}

// 				var text = self.addTaskInput.value;
				
// 				self.addTaskInput.value = '';
// 				// Вызываю pub/sub (отдаю данные контроллеру)
// 				this.emit('add', {title: text});
// 			}.bind(this));
// 		}


// 		// Даже незнаю какой вариант лучше (в первом всё по функциям распределено, а во втором всё в одной но без лишнего кода) 

// 		// Первый вариант
// 		// taskBtnsListeners (item) {	// Рефакторить (использовать data-action у кнопок, таким образом избавимся от методов removeBtnHandler и completeBtnHandler)
// 		// 	const removeBtn = item.querySelector('.deleteBtn');
// 		// 	removeBtn.addEventListener('click', this.removeBtnHandler.bind(this));

// 		// 	const completeBtn = item.querySelector('.completeBtn');
// 		// 	completeBtn.addEventListener('click', this.completeBtnHandler.bind(this));
// 		// 	// Ищем здесь и другие кнопки
// 		// }

// 		// // Методы похожи (надо рефакторить)
// 		// removeBtnHandler ({target}) {
// 		// 	const taskElem = target.closest('.todos-item');	
// 		// 	const id = taskElem.getAttribute('data-id');

// 		// 	this.emit('remove', {elem: taskElem, id});
// 		// }

// 		// completeBtnHandler ({target}) {
// 		// 	const taskElem = target.closest('.todos-item');	
// 		// 	const id = taskElem.getAttribute('data-id');

// 		// 	this.emit('complete', {elem: taskElem, id, isCompleted: taskElem.classList.contains('completed')});
// 		// }

// 		// Второй вариант
// 		taskBtnsListeners (item) {
// 			const self = this;
// 			const btns = item.querySelectorAll('.task-btn');

// 			btns.forEach(function(btn) {
// 				btn.addEventListener('click', function() {
// 					const action = this.getAttribute('data-action');
// 					const id = item.getAttribute('data-id');

// 					if (action === 'delete') {
// 						self.emit('remove', {elem: item, id});
// 					} else if (action === 'complete') {
// 						self.emit('complete', {elem: item, id, isCompleted: item.classList.contains('completed')});
// 					} else if (action === 'edit') {
// 						self.emit('edit', {elem: item, id, isEditing: item.classList.contains('editing')});
// 					}
// 				});
// 			});
// 		}





// 		addTask (taskInfo) {	// Доработать функцию createElement
// 			const taskEditBtn = createElement('span', ['editBtn', 'task-btn'], {'data-action': 'edit'}, ' edit');
// 			const taskCompleteBtn = createElement('span', ['completeBtn', 'task-btn'], {'data-action': 'complete'}, ' complete');
// 			const taskDeleteBtn = createElement('span', ['deleteBtn', 'task-btn'], {'data-action': 'delete'}, ' delete');
// 			const taskEditInput = createElement('input', ['todos-item__input', 'hide'], {value: taskInfo.title});
// 			const taskEl = createElement('div', ['todos-item', taskInfo.isCompleted ? 'completed' : ''], {'data-id': taskInfo.id}, createElement('div', ['todos-item__title'], {}, taskInfo.title), taskEditInput, createElement('div', ['todos-item__actions'], {}, taskEditBtn, taskCompleteBtn, taskDeleteBtn));
			
// 			this.tasksElem.appendChild(taskEl);
// 			this.taskBtnsListeners(taskEl);
// 		}

// 		removeTask (item) {
// 			this.tasksElem.removeChild(item);
// 		}

// 		completeTask (item, isCompleted) {
// 			(!isCompleted) ? item.classList.add('completed') : item.classList.remove('completed');
// 		}

// 		editTask (item, isEditing, id) {
// 			const input = item.querySelector('input.todos-item__input');
// 			const title = item.querySelector('.todos-item__title');

// 			// (!isEditing) ? item.classList.add('editing') : item.classList.remove('editing');	
// 			if (!isEditing) {
// 				item.classList.add('editing');
// 			} else {
// 				item.classList.remove('editing');
// 				this.emit('edited', {elem: item, id, title: input.value});
// 				title.textContent = input.value;
// 			}
			
// 			// this.emit();
// 		}

// 		// editedTask (item, text) {
// 		// 	const title = item.querySelector('.todos-item__title');
// 		// 	title.textContent = text;
// 		// }
	


// 		// Первый вызов должен быть в Controller-е
// 		renderTasks (tasks) {
// 			const self = this;

// 			tasks.forEach(function(task) {
// 				self.addTask(task);
// 			});
// 		}

// 		renderTotalTasksNumber (num) {
// 			this.totalTasksNumElem.textContent = num;
// 		}

// 	}

// 	window.View = View;

// })(window, document);
