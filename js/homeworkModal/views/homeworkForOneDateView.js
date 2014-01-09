MyApp.HomeworkForOneDateView = Backbone.Marionette.ItemView.extend({
    tagName : 'span',
	template: '#homework-for-one-data-template',

	events: {
		"mousedown .pop": "showParticularHomework"
	},
	
	showParticularHomework: function (){
		// this.$(".pop").popover("show");
		this.$(".pop").clickover();
	}
});