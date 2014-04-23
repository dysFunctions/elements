define(function (require){
	var Thorax = require('thorax');

	var ElementView = Thorax.View.extend({

		el: '#container',

		events: {
			"click #submit": "testFunc",
			"click button": "render",
			'keypress #nameInput, #symbolInput' : 'checkForEnter'
		},

		randIndex: 0,

		score: 0,

		count: 0,

		initialize: function(options){
			this.collection2 = options.collection2;
			/*this.player = prompt("Please enter your name: "); */
			this.render();
		},

		render: function(){
			this.count++;
			if (this.count > 10){
				this.$('.modal').find('h3').html('Game Over!');
				this.collection2.trigger('newScore',{name: this.player, score: this.score});
				// this.player = prompt("Please enter your name: ");
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

		checkForEnter: function (event) {
      if (event.charCode === 13) {
				this.testFunc();
			}
    },

		testFunc: function(){
			var self = this;
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
				this.$('.modal').find('h3').html('Congratulations! That is correct!');
				this.$('.modal').modal();
				this.score++;
				this.$('.modal').find('button').click(function(e){
					e.preventDefault();
					self.$("#nameInput").val('');
					self.$("#symbolInput").val('');
				});
		} else {
				var rightAnswer = correctAnswer[0].toUpperCase() + correctAnswer.slice(1);
				this.$('.modal').find('h3').html('Sorry, that is incorrect. Correct answer is <br><strong>'+ rightAnswer+'</strong>');
				this.$('.modal').modal();
				this.$('.modal').find("button").click(function(e){
					e.preventDefault();
					self.$("#nameInput").val('');
					self.$("#symbolInput").val('');
				 });
			}
		}
	});

	return ElementView;
});
