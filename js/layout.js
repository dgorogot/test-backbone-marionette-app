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