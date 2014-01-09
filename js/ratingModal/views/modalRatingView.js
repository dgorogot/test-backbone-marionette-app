MyApp.ModalRatingsView = Backbone.Marionette.CompositeView.extend({
    collection	 	 : new MyApp.GroupRatingCollection(),
    model			 : new MyApp.RatingModalModel(),
	itemViewContainer: '.data-conteiner',
	template   		 : '#modal-content',
	
	initialize: function(){
		this.itemView          = MyApp.RatingsForOneGroupView;
		this.collection.url    = 'data/'+groupID+'/mark.json';
		this.collection.fetch();
	}
});