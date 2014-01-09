MyApp.ModalHomeworkView = Backbone.Marionette.CompositeView.extend({
    collection 		 : new MyApp.HomeworkCollection(),
	model			 : new MyApp.HomeworkModalModel(),
    itemViewContainer: '.data-conteiner',
	template   		 : '#modal-content',
	
	
	initialize: function(){
		this.itemView          = MyApp.HomeworkForOneDateView;
		this.collection.url    = 'data/'+groupID+'/homework.json';
		this.collection.fetch();
		 
	}
});