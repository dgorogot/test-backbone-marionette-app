// var modalType = "Homework";
var modalType = "";
var	group;
var groupID = 1;

MyApp = new Backbone.Marionette.Application();
MyApp.start();

/*main grid model-collection*/
MyApp.Collection = Backbone.Collection.extend({
    url: 'data/groups.json'
});
/*main grid model-collection end*/

/*homework modal model-collection*/
MyApp.HomeworkModalModel = Backbone.Model.extend({
	defaults: {
		"important": "It's important for you to do your homework."+
					 " Try to do all this tasks. If you don't know something"+
					 " - don't worry to ask your question for your teacher! Good luck :-)"
	}
});

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

MyApp.HomeworkCollection= Backbone.Collection.extend({
	model : MyApp.HomeworkModel
});
/*homework modal end model-collection*/


/*Rating modal model-collection*/
MyApp.RatingModalModel = Backbone.Model.extend({
	defaults: {
		"important": "Don't worry if you has bad market."+
					 " Try to do you homework properly"+
					 " and you will have a good result! Good luck :-)"
	}
});

MyApp.GroupRatingCollection= Backbone.Collection.extend({});

MyApp.OnePupilMarksModel = Backbone.Model.extend({
	initialize: function(){
		var meanValue = 0;
		var marks = this.get("marks");
		for(var i = 0; i < marks.length; i++){
			meanValue += marks[i].mark
		}
		meanValue = meanValue/marks.length;
		this.set("meanValue", meanValue);
	}
});

MyApp.RatingCollection= Backbone.Collection.extend({
	model: MyApp.OnePupilMarksModel,
	
	parse: function(response){
		return response.rating;
   }
});

/*Rating modal end model-collection*/


/*main grid views*/
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

MyApp.CompositeView = Backbone.Marionette.CompositeView.extend({
    template		 : '#grid-template',
    itemView		 : MyApp.ItemView,
    itemViewContainer: '.tbody',
	collection       : new MyApp.Collection(),
	
	initialize: function(){
		this.collection.fetch();
	}
});
/*main grid views end*/

/*modal Homework views*/
MyApp.HomeworkForOneDateView = Backbone.Marionette.ItemView.extend({
    tagName : 'span',
	template: '#homework-for-one-data-template',

	events: {
		"click .pop": "showParticularHomework"
	},
	
	showParticularHomework: function (){
		 this.$(".pop").popover();
		// this.$(".pop").clickover({show});
	}
});

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
/*modal Homework views end*/

/*modal Ratings views*/
MyApp.RatingForOnePupilView = Backbone.Marionette.ItemView.extend({
	template: '#rating-row-template',
	tagName : 'tr'
});

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
/*modal Ratings views end*/
MyApp.region = new Backbone.Marionette.Region({ el: '#container'});

MyApp.Layout = Backbone.Marionette.Layout.extend({
    template: '#layout-template',

    regions:{
        content: '#grid-content',
		modalHomework  : '#modal-homework',
		modalRatings  : '#modal-ratings'
    }
});

MyApp.layout = new MyApp.Layout();

MyApp.compositeView     = new MyApp.CompositeView();
MyApp.modalHomeworkView = new MyApp.ModalHomeworkView();
MyApp.modalRatingsView 	= new MyApp.ModalRatingsView();

MyApp.region.show(MyApp.layout);
MyApp.layout.content.show(MyApp.compositeView);
MyApp.layout.modalHomework.show(MyApp.modalHomeworkView);
MyApp.layout.modalRatings.show(MyApp.modalRatingsView);






