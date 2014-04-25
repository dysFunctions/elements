define(function (require){
	var Thorax = require('thorax');

	var ElementView = Thorax.View.extend({

		el: '#container',

		events: {
			"click #submit": "testFunc",
			"click #m1 button": "render",
			"click #m2 button": "redirect",
			'keypress #nameInput, #symbolInput' : 'checkForEnter'
		},

		randIndex: 0,

		score: 0,

		count: 0,

		player: "Isaac Newton",

		topScore: false,

		initialize: function(options){
			this.collection2 = options.collection2;
			this.router = options.router;
			this.render();
		},

		render: function(){
			if (this.count >= 3){
				this.$el.find("#score").html(this.score+"/"+this.count);
				if(this.scoring({score: this.score})){
					this.$("#m2").find('h3').html("Top Ten Score!");
					this.$("#m2").find('h4').html("You got " + this.score + " out of " + this.count + " correct!");
					this.$("#m2").find('input').removeClass('inactive');
					this.$("#m2").modal('show');
				} else {
					this.$("#m2").find('h3').html("Game Over!");
					this.$("#m2").find('h4').html("You got "+this.score+" out of "+this.count+" correct!");
					this.$("#m2").modal('show');					
				}

		
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
			this.$el.find("#score").html(this.score+"/"+this.count);
			}
			$('input').focus();
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
			this.count++;

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
				this.$('#m1').find('h3').html('Congratulations! That is correct!');
				this.$('#m1').modal({backdrop:'static', keyboard: false});
				this.score++;
				this.$('#m1').find('button').click(function(e){
					e.preventDefault();
					self.$("#nameInput").val('');
					self.$("#symbolInput").val('');
				});
		} else {
				var rightAnswer = correctAnswer[0].toUpperCase() + correctAnswer.slice(1);
				this.$('#m1').find('h3').html('Sorry, that is incorrect. Correct answer is <br><strong>'+ rightAnswer +'</strong>');
				this.$('#m1').modal({backdrop:'static',keyboard:false});
				this.$('#m1').find("button").click(function(e){
					e.preventDefault();
					self.$("#nameInput").val('');
					self.$("#symbolInput").val('');
				 });
			}
		},

		scoring: function(params){
          var topTen = this.collection2.topTen();
          var minScore = _.min(topTen);
		  
		  if(params.score > minScore){
            this.collection2.shift();
            this.topScore = true;
            return true;
          } else {
          	return false;
          }

        },

        redirect: function(){

        	if(this.topScore){
        		this.player = $('.modal').find('input').val().toString();
        	}

        	this.collection2.trigger('newScore',{name: this.player, score: this.score, topScore: this.topScore});
        	this.topScore = false;
        	this.score = 0;
			this.count = 0;
			this.$("#m2").find('input').addClass('inactive');
        	this.router.navigate('highScores', {trigger:true,replace:true});
        	this.render();
        }
	});

	return ElementView;
});
