

class EventEmmitter {
	constructor() {
		this.channels = {}
	}

	on (event, listener) {
		if (!this.channels[event]) {
			this.channels[event] = [];
		}
		this.channels[event].push(listener);
	}

	emit (event, data) {
		const channel = this.channels[event];

		if (!channel || !channel.length) {
			return;
		}

		channel.forEach(listener => listener(data));
	}
}

// tagName = 'div', classes = ['elem', 'red-color'], {'name': 'Message'}, childs = NodeElements or strings
function createElement (tagName , classes = [], attrs = {}, childs = '') {
	const tag = document.createElement(tagName);

	classes.forEach(function(className) {
		if (className) tag.classList.add(className);
	});

	for (let attr in attrs) {
		tag.setAttribute(attr, attrs[attr]);
	}

	for (let i = 3; i < arguments.length; i++) {
		let child = arguments[i];
		if (i >= 3) {
			if (typeof child === 'string') {
				child = document.createTextNode(child);
			}
		
			tag.appendChild(child);
		}
	}

	return tag;
}

function saveInLocalStorage (name, data) {
	data = JSON.stringify(data);
	localStorage.setItem(name, data);
}

function loadFromLocalStorage (name) {
	let data = localStorage.getItem(name);
	return JSON.parse(data);
}
