define(function (require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({
		initialize: function (options) {
			this.elementView = options.quiz;
			this.scoresView = options.highScores;
			this.tableView = options.periodicTable;
			this.about = options.about;
		},

		routes: {
			'quiz' : 'displayQuiz',
			'highScores' : 'displayScores',
			'periodicTable' : 'displayPeriodicTable',
			'about' : 'displayAbout'
		},

		displayQuiz: function () {
      console.log("this is the quiz");
			this.elementView.$el.show();
			this.scoresView.$el.hide();
			this.tableView.$el.hide();
			this.about.$el.hide();
		},

		displayScores: function () {
			this.scoresView.$el.show();
			this.elementView.$el.hide();
			this.tableView.$el.hide();
			this.about.$el.hide();
		},

		displayPeriodicTable: function () {
			this.tableView.$el.show();
			this.elementView.$el.hide();
			this.scoresView.$el.hide();
			this.about.$el.hide();
		},

		displayAbout: function () {
			this.about.$el.show();
			this.quiz.$el.hide();
			this.highScores.$el.hide();
			this.periodicTable.$el.hide();
		}
	});
	return Router;
});
