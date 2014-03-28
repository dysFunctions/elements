define(function (require){
	var Backbone = require('backbone');

	var ElementView = Backbone.View.extend({
		
		el: '#container',

		events: {
			"click #submit": "testFunc"
		},

		randIndex: 0,

		score: 0,

		initialize: function(){
			this.render();
		},

		render: function(){
			var randIndex = Math.floor(Math.random()*this.collection.length)
			this.randIndex = randIndex;
			this.$el.find("#element-box").find("#symbol").html(this.collection.at(randIndex).attributes.symbol);
			this.$el.find("#element-box").find("#atomic-weight").html(this.collection.at(randIndex).attributes.atomicWeight);
			this.$el.find("#score").html(this.score+"/10");
		},

		testFunc: function(){
			if(this.$("#nameInput").val() === '' || this.$("#numInput").val() === ''){
				alert('Please enter valid fields');
			}
			else if (this.$("#nameInput").val() === this.collection.at(this.randIndex).attributes.name && this.$("#numInput").val() === this.collection.at(this.randIndex).attributes.atomicNumber.toString()){
				alert('Congratulations! That is correct!');
				this.$("#nameInput").val('');
				this.$("#numInput").val('');
				this.score++;
				this.render();
			} else {
				alert('Sorry, that is incorrect. Correct Element Name is '+ this.collection.at(this.randIndex).attributes.name
					+ " and correct Atomic Number is "+ this.collection.at(this.randIndex).attributes.atomicNumber.toString());
				this.$("#nameInput").val('');
				this.$("#numInput").val('');
				this.render();
			}
		}
	});

	return ElementView;
});