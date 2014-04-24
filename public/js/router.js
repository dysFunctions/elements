define(function (require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({

		initialize: function (options) {
			this.displayHome();
		},

		routes: {
			'home' : 'displayHome',
			'quiz' : 'displayQuiz',
			'highScores' : 'displayScores',
			'periodicTable' : 'displayPeriodicTable',
			'about' : 'displayAbout'
		},

		displayHome: function () {
		      $("#home").show();
		      $("#quiz").hide();
		      $("#highScores").hide();
		      $("#periodicTable").hide();
		      $("#about").hide();
		},

		displayQuiz: function () {
		      $("#home").hide();
		      $("#quiz").show();
		      $("#highScores").hide();
		      $("#periodicTable").hide();
		      $("#about").hide();
		      $('input').focus();
		},

		displayScores: function () {
			  $("#home").hide();
		      $("#quiz").hide();
		      $("#highScores").show();
		      $("#periodicTable").hide();
		      $("#about").hide();
		},

		displayPeriodicTable: function () {
			  $("#home").hide();
		      $("#quiz").hide();
		      $("#highScores").hide();
		      $("#periodicTable").show();
		      $("#about").hide();
		},

		displayAbout: function () {
			  $("#home").hide();
		      $("#quiz").hide();
		      $("#highScores").hide();
		      $("#periodicTable").hide();
		      $("#about").show();
		}
	});
	return Router;
});
