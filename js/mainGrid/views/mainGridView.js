MyApp.CompositeView = Backbone.Marionette.CompositeView.extend({
    template		 : '#grid-template',
    itemView		 : MyApp.ItemView,
    itemViewContainer: '.tbody',
	collection       : new MyApp.Collection(),
	
	initialize: function(){
		this.collection.fetch();
	}
});