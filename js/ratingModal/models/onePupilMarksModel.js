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