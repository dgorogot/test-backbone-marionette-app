MyApp.ItemView = Backbone.Marionette.ItemView.extend({
    tagName : 'tr',
    template: '#row-template',
	
	events: {
		"click .homework": "showHomeworkParticularGroup",
		"click .ratings" : "showRatingsParticularGroup"
	},
	
	showHomeworkParticularGroup: function (){
		modalType = "Homework";
		this.startModal(modalType);
	},
	
	showRatingsParticularGroup: function (){
		modalType = "Ratings";
		this.startModal(modalType);
	},
	
	startModal: function(modalType){
		group   = this.model.attributes.name;
		groupID = this.model.attributes.id;
		
		MyApp["modal"+modalType+"View"].render();
		MyApp["modal"+modalType+"View"].initialize();
	}
});