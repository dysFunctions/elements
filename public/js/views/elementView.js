define(function (require){
	var Backbone = require('backbone');

	var ElementView = Backbone.View.extend({
		
		el: '#container',

		events: {
			"click #submit": "testFunc"
		},

		initialize: function(){
			this.render();
		},

		render: function(){
			this.$el.find("#element-box").find("#symbol").html(this.model.attributes.symbol);
			this.$el.find("#element-box").find("#atomic-weight").html(this.model.attributes.atomicWeight);
		},

		testFunc: function(){
			if(this.$("#nameInput").val() === '' || this.$("#numInput").val() === ''){
				alert('Please enter valid fields');
			}
			else if (this.$("#nameInput").val() === this.model.attributes.name && this.$("#numInput").val() === this.model.attributes.atomicNumber.toString()){
				alert('Congratulations! That is correct!');
				this.$("#nameInput").val('');
				this.$("#numInput").val('');
				location.reload();
			} else {
				alert('Sorry, that is incorrect. Correct Element Name is '+ this.model.attributes.name
					+ " and correct Atomic Number is "+ this.model.attributes.atomicNumber.toString());
				location.reload();
			}
		}
	});

	return ElementView;
});