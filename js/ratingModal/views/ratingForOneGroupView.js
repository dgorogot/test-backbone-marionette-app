MyApp.RatingsForOneGroupView = Backbone.Marionette.CompositeView.extend({
	template: '#ratings-for-one-group-template',
	itemView: MyApp.RatingForOnePupilView,
	itemViewContainer: '.rating-conteiner',
	collection: new MyApp.RatingCollection(),
	
	events: {
		"click #sort-rating": "sortRating"
	},
	
	sortRating: function(){
		this.collection.comparator = function(model){
			return -model.get('meanValue');
		};
		this.collection.sort();
		this.render();
	},
	
	initialize: function(){
		this.collection.url    = 'data/'+groupID+'/mark.json';
		this.collection.fetch();
	}
});