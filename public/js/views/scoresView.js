define(function(require){

    var Backbone = require('backbone');

    var ScoresView = Backbone.View.extend({
      el: "#scores-table",

      initialize: function(){
        this.render();
        this.collection.topTen();
      },

      render: function(){
        var body = '';

        this.collection.each(function(model){
          body += '<tr><td>'+model.attributes.name+'</td><td>'+model.attributes.score+'</td></tr>';
          return body;
        });

        this.$el.find("tbody").append(body);
      }
    });


  return ScoresView;

});
