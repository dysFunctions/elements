define(function (require){
	var Backbone = require('backbone');

	var ElementView = Backbone.View.extend({

		el: '#container',

		events: {
			"click #submit": "testFunc"
		},

		randIndex: 0,

		score: 0,

		count: 0,

		initialize: function(options){
			this.collection2 = options.collection2;
			this.render();
		},

		render: function(){
			this.count++;
			if (this.count > 1){
				alert("Game Over!");
				this.collection2.trigger('newScore',{name: "James", score: Math.floor(Math.random()*11)});
				this.score = 0;
				this.count = 0;
				this.render();
			} else {
			var randIndex = Math.floor(Math.random()*this.collection.length)
			this.randIndex = randIndex;

			if(Math.random() > 0.5){
				this.$el.find("#element-box").find("#name").toggleClass('inactive');
				this.$el.find("#element-box").find("#nameInput").toggleClass('inactive');
				this.$el.find("#element-box").find("#symbol").toggleClass('inactive');
				this.$el.find("#element-box").find("#symbolInput").toggleClass('inactive');
			}

			this.$el.find("#element-box").find("#name").html(this.collection.at(randIndex).attributes.name);
			this.$el.find("#element-box").find("#symbol").html(this.collection.at(randIndex).attributes.symbol);
			this.$el.find("#element-box").find("#atomic-weight").html(this.collection.at(randIndex).attributes.atomicWeight);
			this.$el.find("#element-box").find("#atNum").html(this.collection.at(randIndex).attributes.atomicNumber);
			this.$el.find("#score").html(this.score+"/10");
			}
		},

		testFunc: function(){
			var submission = '';
			var activeDiv = '';
			var correctAnswer = '';
			if (this.$("#nameInput").hasClass('inactive')){
				activeDiv = "#symbolInput";
				correctAnswer = this.collection.at(this.randIndex).attributes.symbol;
			} else {
				activeDiv = "#nameInput";
				correctAnswer = this.collection.at(this.randIndex).attributes.name.toLowerCase();
			}

			var answer = this.$(activeDiv).val().split(' ');

			answer.forEach(function(value){
				if(value && activeDiv === "#nameInput"){
					submission = value.toLowerCase();
				} else {
					submission = value;
				}
			})

			if(submission === ''){
				alert('Please enter valid fields');
			}
			else if (submission === correctAnswer){
				alert('Congratulations! That is correct!');
				this.$("#nameInput").val('');
				this.$("#symbolInput").val('');
				this.score++;
				this.render();
			} else {
				var rightAnswer = correctAnswer[0].toUpperCase() + correctAnswer.slice(1);
				alert('Sorry, that is incorrect. Correct answer is '+ rightAnswer);
				this.$("#nameInput").val('');
				this.$("#symbolInput").val('');
				this.render();
			}
		}
	});

	return ElementView;
});


// PUT request is idempotent -- calling it multiple times does same as calling it one time.
// don't want to use PUT to create a new resource on server.  Want to use POST to post data
// without a particular ID
// Create triggers a POST and save() triggers a PUT
// Look at Backbonejs.org under sync for mappings of different events.
