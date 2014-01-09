MyApp.RatingCollection= Backbone.Collection.extend({
	model: MyApp.OnePupilMarksModel,
	
	parse: function(response){
		return response.rating;
   }
});