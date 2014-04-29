define(function(require){

    var Thorax = require('thorax');

    var YourScoresView = Thorax.View.extend({
      el: "#yourScore",

      initialize: function(){
        var self = this;
      });


        this.render();  // need this?

      },

      render: function(){
        var self = this;
        if (this.count <= 6) {
        this.$el.find("h4").html("Your score:  " + score + "out of " + count);
        }
      },

    });


  return ScoresView;

});