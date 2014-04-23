define (function (require) {

	var Thorax = require('thorax');
	var template = require('hbs!templates/periodicTable');

	var TableView = Thorax.View.extend ({

		el: "#periodicTable",

		initialize: function () {
			this.render();
		}, 
		
		template: template
		
	});


	return TableView;


});