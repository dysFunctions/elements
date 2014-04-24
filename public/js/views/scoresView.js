define(function(require){

    var Thorax = require('thorax');

    var ScoresView = Thorax.View.extend({
      el: "#scores-table",

      initialize: function(){
        var self = this;
        this.collection.on('newScore', function(params){
          var topTen = self.collection.topTen();
          var minScore = _.min(topTen);
          if (topTen.length < 10){
            self.pushScores(params);
          }
          else if(params.score > minScore){
            self.collection.shift();
            self.pushScores(params);
          }
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

      scoreSync:function(params){
        $.ajax ({
          url: '/api/scores',
          type: 'PUT',
          data: JSON.stringify({"scores":params})
        });
      },

      pushScores: function(params){
        var data = [];
        this.collection.add(params);
        this.render();
        this.collection.forEach(function(model){
          data.push(model.attributes);
        });
        this.scoreSync(data);
      }

    });


  return ScoresView;

});
