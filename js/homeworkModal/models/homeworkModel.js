MyApp.HomeworkModel = Backbone.Model.extend({
	initialize: function(){
		var tasks = this.get("tasks");
	    var tasksPrint = '';
		for (var i = 0; i < tasks.length; i++){
			tasksPrint  += i+1+". "+tasks[i]+';</br>'
		}
		this.set("tasksPrint", tasksPrint);
	}
});