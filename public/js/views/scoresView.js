define(function(require){

    var Backbone = require('backbone');

    var ScoresView = Backbone.View.extend({
      el: "#scores-table",

      initialize: function(){
        var self = this;
        this.collection.on('newScore', function(params){
          var data = [];
          self.collection.add(params);
          self.render();
          self.collection.forEach(function(model){
            data.push(model.attributes);
          });
          self.scoreSync(data);
        });
        this.render();

      },

      render: function(){
        var body = '';
        this.$el.find("tbody").html('');
        this.collection.each(function(model){
          body += '<tr><td>'+model.attributes.name+'</td><td>'+model.attributes.score+'</td></tr>';
          return body;
        });

        this.$el.find("tbody").append(body);
      },

      scoreSync:function(params){
        $.ajax ({
          url: '/api/scores',
          type: 'PUT',
          data: JSON.stringify({"scores":params})
        });
      }

    });


  return ScoresView;

});
