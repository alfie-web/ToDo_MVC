
// Переделать всё это в класс App

const initialState = loadFromLocalStorage('state') || {
	tasks: [
		{id: 0, title: 'Test task1', isCompleted: false},
		{id: 1, title: 'Test task2', isCompleted: false}
	]
};

const model = new Model(initialState);
const view = new View('.todos-items', '#addTodo');
const controller = new Controller(model, view);