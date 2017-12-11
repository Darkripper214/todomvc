/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {
	'use strict';

	var Utils = app.Utils;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.TodoModel = function (key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	};

	app.TodoModel.prototype.subscribe = function (onChange) {
		this.onChanges.push(onChange);
	};

	app.TodoModel.prototype.inform = function () {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) { cb(); });
	};

	app.TodoModel.prototype.addTodo = function (title) {
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
			date: today,
			sortDate:Date.now(),
			completed: false
		});

		this.inform();
	};

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		
		if(dd<10) {
		    dd = '0'+dd
		} 
		
		if(mm<10) {
		    mm = '0'+mm
		} 
		
		today = mm + '/' + dd + '/' + yyyy;

	app.TodoModel.prototype.toggleAll = function (checked) {
		// Note: it's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map() and filter() everywhere instead of mutating the array or
		// todo items themselves.
		this.todos = this.todos.map(function (todo) {
			return Utils.extend({}, todo, {completed: checked});
		});

		this.inform();
	};

	app.TodoModel.prototype.toggle = function (todoToToggle) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.inform();
	};

	app.TodoModel.prototype.destroy = function (todo) {
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});

		this.inform();
	};

	app.TodoModel.prototype.save = function (todoToSave, text) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
			
		});

		this.inform();
	};
	


	app.TodoModel.prototype.clearCompleted = function () {
		this.todos = this.todos.filter(function (todo) {
			console.log("die");
			return !todo.completed;
		});

		this.inform();
	};
	
	var sortNum=1 ;

		app.TodoModel.prototype.sortingDate = function () {
		this.todos = this.todos.slice(0);
		sortNum = sortNum + 1;
		if(sortNum %2 == 0){
					this.todos.sort(function(a,b) {
					return a.sortDate - b.sortDate;
				});
				console.log('by date:');
				console.log(this.todos);
				Utils.store(this.key, this.todos);
				this.onChanges.forEach(function (cb) { cb(); });
				this.inform();
				return this.todos;
		}else {
					this.todos.sort(function(a,b) {
					return b.sortDate - a.sortDate;
				});
				console.log('by date:');
				console.log(this.todos);
				Utils.store(this.key, this.todos);
				this.onChanges.forEach(function (cb) { cb(); });
				this.inform();
				return this.todos;	
				
		}
		
	};

})();
