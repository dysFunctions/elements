define (function (require) {

	var Backbone = require('backbone');

	var PeriodicTableView = Backbone.View.extend ({

		el: "#periodicTable",

		initialize: function () {
			this.render();
		}, 

		render: function () {

			var body = '';

			this.collection.each(function(model) {
				
			})
		}

	})





});