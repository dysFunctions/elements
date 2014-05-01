define(function(require){

    var Thorax = require('thorax');

    var ScoresView = Thorax.View.extend({
      el: "#scores-table",

      initialize: function(){
        var self = this;
        //var count = 10;  // get the real count variable w/o breaking the quiz view
        this.collection.on('newScore', function(params){
          if(params.topScore){
            self.collection.pushScores({name: params.name, score: params.score});
            self.$el.find('#yourScore').html("Your score:  " + params.score + " out of " + params.count);
            self.$el.find('#yourScore').removeClass('inactive');
          } else {
            self.$el.find('#yourScore').html("Your score:  " + params.score + " out of " + params.count);
            self.$el.find('#yourScore').removeClass('inactive');
          }
          
          self.render();
      });


        this.render();

      },

      render: function(){
        var body = '';
        var self = this;
        this.$el.find("tbody").html('');
        this.collection.each(function(model){
          self.$el.find("tbody").prepend('<tr><td>'+model.attributes.name+'</td><td>'+model.attributes.score+'</td></tr>');
        });

      },

    });


  return ScoresView;

});
